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
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../core/entities");
const typeorm_2 = require("typeorm");
let TestService = class TestService {
    constructor(testRepository) {
        this.testRepository = testRepository;
    }
    async createTest(dto) {
        try {
            return await this.testRepository.save(dto);
        }
        catch (error) {
            console.log('error', error);
        }
    }
    async findAllTests() {
        try {
            return await this.testRepository.find();
        }
        catch (error) {
            throw new common_1.NotFoundException({
                message: 'Не вдалось знайти тести',
                error,
            });
        }
    }
    async findTestById(id) {
        try {
            return await this.testRepository.find({ where: { id } });
        }
        catch (error) {
            throw new common_1.NotFoundException({
                message: 'Не вдалось знайти тест',
                error,
            });
        }
    }
    async changeTestTitleById(id, title) {
        try {
            try {
                const test = await this.testRepository.findOne({
                    where: { id },
                });
                test.title = title;
                await this.testRepository.save(test);
                return test;
            }
            catch (error) {
                throw new common_1.HttpException('Проблеми з обновленням назви', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) { }
    }
    async removeAllTests() {
        try {
            await (0, typeorm_2.getConnection)().createQueryBuilder().delete().from(entities_1.Test).execute();
            return {
                status: common_1.HttpStatus.OK,
                message: 'Ви видалили всі рядки',
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Неочікувано помлика з видаленням рядків', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeTestById(id) {
        try {
            await this.testRepository.delete(id);
            return {
                message: `Рядок з id ${id} був видалений`,
            };
        }
        catch (error) {
            console.log('aaaaaa');
            throw new common_1.HttpException('Неочікувано помлика з видалення рядка', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
TestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Test)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TestService);
exports.TestService = TestService;
//# sourceMappingURL=test.service.js.map