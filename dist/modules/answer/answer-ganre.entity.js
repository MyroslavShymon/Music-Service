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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerToGanre = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
const ganre_entity_1 = require("./ganre.entity");
let AnswerToGanre = class AnswerToGanre {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AnswerToGanre.prototype, "answerToGanreId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AnswerToGanre.prototype, "answerId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AnswerToGanre.prototype, "ganreId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', default: 0, unsigned: true, scale: 10 }),
    __metadata("design:type", Number)
], AnswerToGanre.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Answer, (answer) => answer.answerToGanres),
    __metadata("design:type", typeof (_a = typeof _1.Answer !== "undefined" && _1.Answer) === "function" ? _a : Object)
], AnswerToGanre.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ganre_entity_1.Ganre, (ganre) => ganre.answerToGanres),
    __metadata("design:type", typeof (_b = typeof ganre_entity_1.Ganre !== "undefined" && ganre_entity_1.Ganre) === "function" ? _b : Object)
], AnswerToGanre.prototype, "ganre", void 0);
AnswerToGanre = __decorate([
    (0, typeorm_1.Entity)()
], AnswerToGanre);
exports.AnswerToGanre = AnswerToGanre;
//# sourceMappingURL=answer-ganre.entity.js.map