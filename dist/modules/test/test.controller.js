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
exports.TestController = void 0;
const common_1 = require("@nestjs/common");
const change_test_dto_1 = require("./dtos/change-test.dto");
const create_test_dto_1 = require("./dtos/create-test.dto");
const test_service_1 = require("./test.service");
let TestController = class TestController {
    constructor(testService) {
        this.testService = testService;
    }
    create(testDto) {
        return this.testService.createTest(testDto);
    }
    getAll() {
        return this.testService.getAllTests();
    }
    getById(params) {
        return this.testService.findTestById(params.id);
    }
    changeTitle(params, answerDto) {
        return this.testService.changeTestTitleById(params.id, answerDto.title);
    }
    removeAll() {
        return this.testService.removeAllTests();
    }
    removeById(params) {
        return this.testService.removeTestById(params.id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_test_dto_1.CreateTestDto]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_test_dto_1.ChangeTestDto]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "changeTitle", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestController.prototype, "removeAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "removeById", null);
TestController = __decorate([
    (0, common_1.Controller)('/test'),
    __metadata("design:paramtypes", [test_service_1.TestService])
], TestController);
exports.TestController = TestController;
//# sourceMappingURL=test.controller.js.map