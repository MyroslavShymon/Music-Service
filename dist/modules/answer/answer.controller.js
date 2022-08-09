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
exports.AnswerController = void 0;
const common_1 = require("@nestjs/common");
const answer_service_1 = require("./answer.service");
const change_answer_dto_1 = require("./dtos/change-answer.dto");
const create_answer_dto_1 = require("./dtos/create-answer.dto");
let AnswerController = class AnswerController {
    constructor(answerService) {
        this.answerService = answerService;
    }
    create(answerDto) {
        return this.answerService.createAnswer(answerDto);
    }
    createConnectToTest(answerDto) {
        return this.answerService.createAnswerToTestConnect(answerDto);
    }
    findById(params) {
        return this.answerService.findAnswerById(params.id);
    }
    renameTitle(params, answerDto) {
        return this.answerService.changeAnswerTitleById(params.id, answerDto.title);
    }
    getAll(query) {
        return this.answerService.getAllAnswers(query.testId, query.nextTestId);
    }
    removeAll() {
        return this.answerService.removeAllAnswers();
    }
    removeById(params) {
        return this.answerService.removeAnswerById(params.id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_answer_dto_1.CreateAnswerDto]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/connect'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "createConnectToTest", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_answer_dto_1.ChangeAnswerDto]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "renameTitle", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "removeAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "removeById", null);
AnswerController = __decorate([
    (0, common_1.Controller)('/answer'),
    __metadata("design:paramtypes", [answer_service_1.AnswerService])
], AnswerController);
exports.AnswerController = AnswerController;
//# sourceMappingURL=answer.controller.js.map