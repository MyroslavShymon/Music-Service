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
exports.AlbumController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const album_service_1 = require("./album.service");
const change_album_dto_1 = require("./dtos/change-album.dto");
const create_album_dto_1 = require("./dtos/create-album.dto");
const create_album_genre_dto_1 = require("./dtos/create-album-genre.dto");
let AlbumController = class AlbumController {
    constructor(albumService) {
        this.albumService = albumService;
    }
    create(albumDto, image) {
        return this.albumService.createAlbum(albumDto, image);
    }
    createConnectToGenre(albumDto) {
        return this.albumService.createAlbumToGenreConnect(albumDto);
    }
    findAll() {
        return this.albumService.getAllAlbums();
    }
    findById(params) {
        return this.albumService.findAlbumById(params.id);
    }
    renameTitle(params, albumDto) {
        return this.albumService.changeAlbumById(params.id, albumDto);
    }
    removeAll() {
        return this.albumService.removeAllAlbums();
    }
    removeById(params) {
        return this.albumService.removeAlbumById(params.id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_album_dto_1.CreateAlbumrDto, Object]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/connect'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_album_genre_dto_1.CreateAlbumToGenreDto]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "createConnectToGenre", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_album_dto_1.ChangeAlbumDto]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "renameTitle", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "removeAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "removeById", null);
AlbumController = __decorate([
    (0, common_1.Controller)('/album'),
    __metadata("design:paramtypes", [album_service_1.AlbumService])
], AlbumController);
exports.AlbumController = AlbumController;
//# sourceMappingURL=album.controller.js.map