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
exports.Song = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Song = class Song {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Song.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Song.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '' }),
    __metadata("design:type", String)
], Song.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Song.prototype, "audio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], Song.prototype, "plays", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], Song.prototype, "disc", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Album, (album) => album.songs, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", _1.Album)
], Song.prototype, "album", void 0);
Song = __decorate([
    (0, typeorm_1.Entity)()
], Song);
exports.Song = Song;
//# sourceMappingURL=song.entity.js.map