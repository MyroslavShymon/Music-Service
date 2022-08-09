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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumToGenre = void 0;
const typeorm_1 = require("typeorm");
const album_entity_1 = require("./album.entity");
const genre_entity_1 = require("./genre.entity");
let AlbumToGenre = class AlbumToGenre {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AlbumToGenre.prototype, "albumToGenreId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AlbumToGenre.prototype, "albumId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AlbumToGenre.prototype, "genreId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => album_entity_1.Album, (album) => album.albumToGenres, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", album_entity_1.Album)
], AlbumToGenre.prototype, "album", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => genre_entity_1.Genre, (genre) => genre.albumToGenres, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", genre_entity_1.Genre)
], AlbumToGenre.prototype, "genre", void 0);
AlbumToGenre = __decorate([
    (0, typeorm_1.Entity)()
], AlbumToGenre);
exports.AlbumToGenre = AlbumToGenre;
//# sourceMappingURL=album-genre.entity.js.map