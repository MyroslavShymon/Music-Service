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
exports.AlbumService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const entities_1 = require("../../core/entities");
const default_response_interface_1 = require("../../core/interfaces/default-response.interface");
const performer_service_1 = require("../performer/performer.service");
const enums_1 = require("../../core/enums");
const file_service_1 = require("../../core/modules/file/file.service");
const genre_service_1 = require("../genre/genre.service");
let AlbumService = class AlbumService {
    constructor(performerService, genreService, fileService, albumRepository, albumToGenreRepository) {
        this.performerService = performerService;
        this.genreService = genreService;
        this.fileService = fileService;
        this.albumRepository = albumRepository;
        this.albumToGenreRepository = albumToGenreRepository;
    }
    async createAlbum(dto, image) {
        const existedAlbum = await this.albumRepository.findOne({
            where: { title: dto.title, year: dto.year },
        });
        if (existedAlbum) {
            throw new common_1.BadRequestException('Альбом вже існує');
        }
        const performer = await this.performerService.findPerformerById(dto.performerId);
        if (!performer) {
            throw new common_1.NotFoundException('Такого виконавця не існує');
        }
        const imagePath = image
            ? this.fileService.createFile(enums_1.FileType.IMAGE, image)
            : null;
        return this.albumRepository.save({
            title: dto.title,
            description: dto.description,
            year: dto.year,
            image: imagePath,
            performer,
        });
    }
    async createAlbumToGenreConnect(dto) {
        const album = await this.findAlbumById(dto.albumId);
        const genre = await this.genreService.findGenreById(dto.genreId);
        return this.albumToGenreRepository.save({
            albumId: album.id,
            genreId: genre.id,
        });
    }
    async removeAllAlbums() {
        await (0, typeorm_1.getConnection)().createQueryBuilder().delete().from(entities_1.Album).execute();
        return {
            status: common_1.HttpStatus.OK,
            message: 'Ви видалили всі рядки',
        };
    }
    async removeAlbumById(id) {
        await this.findAlbumById(id);
        await this.albumRepository.delete(id);
        return {
            status: common_1.HttpStatus.OK,
            message: `Альбом з id ${id} була видалена`,
        };
    }
    async findAlbumById(id) {
        const album = await this.albumRepository.findOne({ where: { id } });
        if (!album) {
            throw new common_1.NotFoundException(`Немає альбому з таким id ${id}`);
        }
        return album;
    }
    async getAllAlbums() {
        return this.albumRepository.find();
    }
    async changeAlbumById(id, dto) {
        const album = await this.findAlbumById(id);
        if (album.title === dto.title) {
            throw new common_1.BadRequestException('Ви хочете змінити назву альбома на ту ж саму');
        }
        if (album.year === dto.year) {
            throw new common_1.BadRequestException('Ви хочете змінити рік видачі альбома на той же саме');
        }
        album.title = dto.title;
        album.year = dto.year;
        return this.albumRepository.save(album);
    }
};
AlbumService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_2.InjectRepository)(entities_1.Album)),
    __param(4, (0, typeorm_2.InjectRepository)(entities_1.AlbumToGenre)),
    __metadata("design:paramtypes", [performer_service_1.PerformerService,
        genre_service_1.GenreService,
        file_service_1.FileService,
        typeorm_1.Repository,
        typeorm_1.Repository])
], AlbumService);
exports.AlbumService = AlbumService;
//# sourceMappingURL=album.service.js.map