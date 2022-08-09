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
exports.PerformerController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const change_performer_dto_1 = require("./dtos/change-performer.dto");
const create_performer_dto_1 = require("./dtos/create-performer.dto");
const performer_service_1 = require("./performer.service");
let PerformerController = class PerformerController {
    constructor(performerService) {
        this.performerService = performerService;
    }
    create(performerDto, image) {
        return this.performerService.createPerformer(performerDto, image);
    }
    getAll() {
        return this.performerService.getAllPerformers();
    }
    getById(params) {
        return this.performerService.findPerformerById(params.id);
    }
    changePerformer(params, performerDto) {
        return this.performerService.changePerformerById(params.id, performerDto);
    }
    removeAll() {
        return this.performerService.removeAllPerformers();
    }
    removeById(params) {
        return this.performerService.removePerformerById(params.id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_performer_dto_1.CreatePerformerDto, Object]),
    __metadata("design:returntype", void 0)
], PerformerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PerformerController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PerformerController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_performer_dto_1.ChangePerformerDto]),
    __metadata("design:returntype", void 0)
], PerformerController.prototype, "changePerformer", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PerformerController.prototype, "removeAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PerformerController.prototype, "removeById", null);
PerformerController = __decorate([
    (0, common_1.Controller)('/performer'),
    __metadata("design:paramtypes", [performer_service_1.PerformerService])
], PerformerController);
exports.PerformerController = PerformerController;
//# sourceMappingURL=performer.controller.js.map