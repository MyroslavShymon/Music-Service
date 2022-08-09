"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../core/entities");
const test_service_1 = require("../test/test.service");
const answer_controller_1 = require("./answer.controller");
const answer_service_1 = require("./answer.service");
let AnswerModule = class AnswerModule {
};
AnswerModule = __decorate([
    (0, common_1.Module)({
        controllers: [answer_controller_1.AnswerController],
        providers: [answer_service_1.AnswerService, test_service_1.TestService],
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Answer, entities_1.AnswerToTest, entities_1.Test])],
        exports: [answer_service_1.AnswerService],
    })
], AnswerModule);
exports.AnswerModule = AnswerModule;
//# sourceMappingURL=answer.module.js.map