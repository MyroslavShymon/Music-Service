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
exports.Answer = void 0;
const typeorm_1 = require("typeorm");
const answer_genre_entity_1 = require("./answer-genre.entity");
const answer_test_entity_1 = require("./answer-test.entity");
let Answer = class Answer {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Answer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, unique: true, nullable: false }),
    __metadata("design:type", String)
], Answer.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => answer_genre_entity_1.AnswerToGenre, (answerToGenre) => answerToGenre.answer, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Answer.prototype, "answerToGenres", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => answer_test_entity_1.AnswerToTest, (answerToTest) => answerToTest.answer, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Answer.prototype, "answerToTests", void 0);
Answer = __decorate([
    (0, typeorm_1.Entity)()
], Answer);
exports.Answer = Answer;
//# sourceMappingURL=answer.entity.js.map