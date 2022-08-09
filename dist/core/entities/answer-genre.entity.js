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
exports.AnswerToGenre = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const genre_entity_1 = require("./genre.entity");
let AnswerToGenre = class AnswerToGenre {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AnswerToGenre.prototype, "answerToGenreId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AnswerToGenre.prototype, "answerId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AnswerToGenre.prototype, "genreId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0, unsigned: true, scale: 10 }),
    __metadata("design:type", Number)
], AnswerToGenre.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Answer, (answer) => answer.answerToGenres, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", _1.Answer)
], AnswerToGenre.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => genre_entity_1.Genre, (genre) => genre.answerToGenres, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", genre_entity_1.Genre)
], AnswerToGenre.prototype, "genre", void 0);
AnswerToGenre = __decorate([
    (0, typeorm_1.Entity)()
], AnswerToGenre);
exports.AnswerToGenre = AnswerToGenre;
//# sourceMappingURL=answer-genre.entity.js.map