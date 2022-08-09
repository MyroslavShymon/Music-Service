"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const performer_controller_1 = require("./performer.controller");
const performer_service_1 = require("./performer.service");
const entities_1 = require("../../core/entities");
const file_service_1 = require("../../core/modules/file/file.service");
let PerformerModule = class PerformerModule {
};
PerformerModule = __decorate([
    (0, common_1.Module)({
        controllers: [performer_controller_1.PerformerController],
        providers: [performer_service_1.PerformerService, file_service_1.FileService],
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.Performer])],
        exports: [performer_service_1.PerformerService],
    })
], PerformerModule);
exports.PerformerModule = PerformerModule;
//# sourceMappingURL=performer.module.js.map