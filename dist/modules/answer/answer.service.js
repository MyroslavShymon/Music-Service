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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const entities_1 = require("../../core/entities");
const default_response_interface_1 = require("../../core/interfaces/default-response.interface");
const test_service_1 = require("../test/test.service");
let AnswerService = class AnswerService {
    constructor(answerRepository, answerToTestRepository, testService) {
        this.answerRepository = answerRepository;
        this.answerToTestRepository = answerToTestRepository;
        this.testService = testService;
    }
    async createAnswer(dto) {
        const existedAnswer = await this.answerRepository.findOne({
            where: { title: dto.title },
        });
        if (existedAnswer) {
            throw new common_1.BadRequestException('Відповіть вже існує');
        }
        return this.answerRepository.save(dto);
    }
    async createAnswerToTestConnect(dto) {
        const test = await this.testService.findTestById(dto.testId);
        let nextTest;
        try {
            nextTest = await this.testService.findTestById(dto.nextTestId);
        }
        catch (e) {
            nextTest = null;
        }
        const answer = await this.findAnswerById(dto.answerId);
        console.log('nextTest', nextTest);
        return this.answerToTestRepository.save({
            answerId: answer.id,
            testId: test.id,
            nextTestId: nextTest === null || nextTest === void 0 ? void 0 : nextTest.id,
        });
    }
    async getAllAnswers(testId, nextTestId) {
        if (!testId && !nextTestId) {
            return this.answerRepository.find();
        }
        if (testId && !nextTestId) {
            return this.answerRepository
                .createQueryBuilder('answer')
                .leftJoinAndSelect('answer.answerToTests', 'test')
                .setParameters({ testId })
                .where('test.testId = :testId')
                .getMany();
        }
        if (!testId && nextTestId) {
            return this.answerRepository
                .createQueryBuilder('answer')
                .leftJoinAndSelect('answer.answerToTests', 'test')
                .setParameters({ nextTestId })
                .where('test.nextTestId = :nextTestId')
                .getMany();
        }
        const answer = await this.answerRepository
            .createQueryBuilder('answer')
            .leftJoinAndSelect('answer.answerToTests', 'test')
            .setParameters({ testId, nextTestId })
            .where('test.testId = :testId')
            .where('test.nextTestId = :nextTestId')
            .getMany();
        if (!answer) {
            throw new common_1.NotFoundException(`Не знайдено такої відповіді`);
        }
        return answer;
    }
    async findAnswerById(id) {
        const answer = await this.answerRepository.findOne({
            where: { id },
        });
        if (!answer) {
            throw new common_1.NotFoundException(`Немає відповіді з таким id ${id}`);
        }
        return answer;
    }
    async changeAnswerTitleById(id, title) {
        const answer = await this.findAnswerById(id);
        if (answer.title === title) {
            throw new common_1.BadRequestException('Ви не ідентичні назви');
        }
        answer.title = title;
        return this.answerRepository.save(answer);
    }
    async removeAllAnswers() {
        await (0, typeorm_1.getConnection)().createQueryBuilder().delete().from(entities_1.Answer).execute();
        return {
            status: common_1.HttpStatus.OK,
            message: 'Ви видалили всі рядки',
        };
    }
    async removeAnswerById(id) {
        await this.findAnswerById(id);
        await this.answerRepository.delete(id);
        return {
            status: common_1.HttpStatus.OK,
            message: `Відповідь з id ${id} була видалена`,
        };
    }
};
AnswerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.Answer)),
    __param(1, (0, typeorm_2.InjectRepository)(entities_1.AnswerToTest)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        test_service_1.TestService])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map