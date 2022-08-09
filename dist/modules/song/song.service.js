"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const entities_1 = require("../../core/entities");
const album_service_1 = require("../album/album.service");
const file_service_1 = require("../../core/modules/file/file.service");
const enums_1 = require("../../core/enums");
const default_response_interface_1 = require("../../core/interfaces/default-response.interface");
let SongService = class SongService {
    constructor(albumService, fileService, songRepository) {
        this.albumService = albumService;
        this.fileService = fileService;
        this.songRepository = songRepository;
    }
    async createSong(dto, audio) {
        const existedSongAtAlbum = await this.songRepository
            .createQueryBuilder('song')
            .leftJoinAndSelect('song.album', 'album')
            .setParameters({ albumId: dto.albumId, title: dto.title })
            .where('album.id = :albumId')
            .where('song.title = :title')
            .getOne();
        if (existedSongAtAlbum) {
            throw new common_1.BadRequestException(`Пісня з назвою ${existedSongAtAlbum.title} вже існує в альбмі`);
        }
        const album = await this.albumService.findAlbumById(dto.albumId);
        const audioPath = this.fileService.createFile(enums_1.FileType.AUDIO, audio);
        return this.songRepository.save({
            title: dto.title,
            text: dto.text,
            audio: audioPath,
            album,
        });
    }
    async removeAllSongs() {
        await (0, typeorm_1.getConnection)().createQueryBuilder().delete().from(entities_1.Song).execute();
        return {
            status: common_1.HttpStatus.OK,
            message: 'Ви видалили всі рядки',
        };
    }
    async removeSongById(id) {
        await this.findSongById(id);
        await this.songRepository.delete(id);
        return {
            status: common_1.HttpStatus.OK,
            message: `Пісня з id ${id} була видалена`,
        };
    }
    async findSongById(id) {
        const song = await this.songRepository.findOne({
            where: { id },
        });
        if (!song) {
            throw new common_1.NotFoundException(`Немає пісні з таким id ${id}`);
        }
        return song;
    }
    async getAllSongs() {
        return this.songRepository.find();
    }
    async changeSongById(id, dto) {
        const song = await this.findSongById(id);
        if (song.title === dto.title) {
            throw new common_1.BadRequestException('Ви хочете змінити назву пісні на ту ж саму');
        }
        if (song.text === dto.text) {
            throw new common_1.BadRequestException('Ви хочете змінити текст пісні на ту ж саму');
        }
        song.title = dto.title;
        song.text = dto.text;
        return this.songRepository.save(song);
    }
};
SongService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(entities_1.Song)),
    __metadata("design:paramtypes", [album_service_1.AlbumService,
        file_service_1.FileService,
        typeorm_1.Repository])
], SongService);
exports.SongService = SongService;
//# sourceMappingURL=song.service.js.map