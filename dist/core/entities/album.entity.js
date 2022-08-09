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
exports.Album = void 0;
const typeorm_1 = require("typeorm");
const performer_entity_1 = require("./performer.entity");
const song_entity_1 = require("./song.entity");
const genre_entity_1 = require("./genre.entity");
const album_genre_entity_1 = require("./album-genre.entity");
let Album = class Album {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Album.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, type: 'varchar', length: 200, nullable: false }),
    __metadata("design:type", String)
], Album.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Album.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, nullable: true }),
    __metadata("design:type", String)
], Album.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => song_entity_1.Song, (song) => song.album),
    __metadata("design:type", Array)
], Album.prototype, "songs", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => performer_entity_1.Performer, (performer) => performer.albums, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", performer_entity_1.Performer)
], Album.prototype, "performer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => album_genre_entity_1.AlbumToGenre, (albumToGenre) => albumToGenre.album, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Album.prototype, "albumToGenres", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => genre_entity_1.Genre, (genre) => genre.albums, { cascade: true }),
    (0, typeorm_1.JoinTable)({
        name: 'albums_genres',
        joinColumn: { name: 'genreId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'albumId' },
    }),
    __metadata("design:type", Array)
], Album.prototype, "genres", void 0);
Album = __decorate([
    (0, typeorm_1.Entity)()
], Album);
exports.Album = Album;
//# sourceMappingURL=album.entity.js.map