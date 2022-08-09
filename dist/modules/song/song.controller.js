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
exports.SongController = void 0;
const common_1 = require("@nestjs/common");
const song_service_1 = require("./song.service");
const create_song_dto_1 = require("./dtos/create-song.dto");
const platform_express_1 = require("@nestjs/platform-express");
const change_song_1 = require("./dtos/change-song");
let SongController = class SongController {
    constructor(songService) {
        this.songService = songService;
    }
    create(songDto, audio) {
        return this.songService.createSong(songDto, audio);
    }
    getAll() {
        return this.songService.getAllSongs();
    }
    getById(params) {
        return this.songService.findSongById(params.id);
    }
    changeSong(params, songDto) {
        return this.songService.changeSongById(params.id, songDto);
    }
    removeAll() {
        return this.songService.removeAllSongs();
    }
    removeById(params) {
        return this.songService.removeSongById(params.id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('audio')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_song_dto_1.CreateSongDto, Object]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SongController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_song_1.ChangeSongDto]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "changeSong", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SongController.prototype, "removeAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "removeById", null);
SongController = __decorate([
    (0, common_1.Controller)('/song'),
    __metadata("design:paramtypes", [song_service_1.SongService])
], SongController);
exports.SongController = SongController;
//# sourceMappingURL=song.controller.js.map