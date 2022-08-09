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
exports.TestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const entities_1 = require("../../core/entities");
const default_response_interface_1 = require("../../core/interfaces/default-response.interface");
let TestService = class TestService {
    constructor(testRepository) {
        this.testRepository = testRepository;
    }
    async createTest(dto) {
        const existedTest = await this.testRepository.findOne({
            where: { title: dto.title },
        });
        if (existedTest) {
            throw new common_1.BadRequestException('Тест вже існує');
        }
        return this.testRepository.save(dto);
    }
    async getAllTests() {
        return this.testRepository.find();
    }
    async findTestById(id) {
        const test = await this.testRepository.findOne({ where: { id } });
        if (!test) {
            throw new common_1.NotFoundException(`Немає тесту з таким id ${id}`);
        }
        return test;
    }
    async changeTestTitleById(id, title) {
        const test = await this.findTestById(id);
        if (test.title === title) {
            throw new common_1.BadRequestException('Тест має таку ж саму назву');
        }
        test.title = title;
        return this.testRepository.save(test);
    }
    async removeAllTests() {
        await (0, typeorm_1.getConnection)().createQueryBuilder().delete().from(entities_1.Test).execute();
        return {
            status: common_1.HttpStatus.OK,
            message: 'Ви видалили всі рядки',
        };
    }
    async removeTestById(id) {
        await this.findTestById(id);
        await this.testRepository.delete(id);
        return {
            status: common_1.HttpStatus.OK,
            message: `Тест з id ${id} був видалений`,
        };
    }
};
TestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(entities_1.Test)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TestService);
exports.TestService = TestService;
//# sourceMappingURL=test.service.js.map