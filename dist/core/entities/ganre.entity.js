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
exports.Genre = void 0;
const typeorm_1 = require("typeorm");
const album_entity_1 = require("./album.entity");
const answer_genre_entity_1 = require("./answer-genre.entity");
const preferences_entity_1 = require("./preferences.entity");
let Genre = class Genre {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Genre.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, type: 'varchar', length: 200, nullable: false }),
    __metadata("design:type", String)
], Genre.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, type: 'text' }),
    __metadata("design:type", String)
], Genre.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, nullable: false }),
    __metadata("design:type", String)
], Genre.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => answer_genre_entity_1.AnswerToGenre, (answerToGenre) => answerToGenre.genre, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Genre.prototype, "answerToGenres", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => preferences_entity_1.Preferences, (preference) => preference.genre, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Genre.prototype, "preferences", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => album_entity_1.Album, (album) => album.genres),
    __metadata("design:type", Array)
], Genre.prototype, "albums", void 0);
Genre = __decorate([
    (0, typeorm_1.Entity)()
], Genre);
exports.Genre = Genre;
//# sourceMappingURL=ganre.entity.js.map