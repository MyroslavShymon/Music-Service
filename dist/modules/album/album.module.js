"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../core/entities");
const file_service_1 = require("../../core/modules/file/file.service");
const performer_service_1 = require("../performer/performer.service");
const album_controller_1 = require("./album.controller");
const album_service_1 = require("./album.service");
const genre_module_1 = require("../genre/genre.module");
let AlbumModule = class AlbumModule {
};
AlbumModule = __decorate([
    (0, common_1.Module)({
        controllers: [album_controller_1.AlbumController],
        providers: [album_service_1.AlbumService, performer_service_1.PerformerService, file_service_1.FileService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.Album, entities_1.Performer, entities_1.AlbumToGenre]),
            genre_module_1.GenreModule,
        ],
        exports: [album_service_1.AlbumService],
    })
], AlbumModule);
exports.AlbumModule = AlbumModule;
//# sourceMappingURL=album.module.js.map