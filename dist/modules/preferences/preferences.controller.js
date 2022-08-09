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
exports.PreferencesController = void 0;
const common_1 = require("@nestjs/common");
const preferences_service_1 = require("./preferences.service");
let PreferencesController = class PreferencesController {
    constructor(preferencesService) {
        this.preferencesService = preferencesService;
    }
    getUserPreferences(params) {
        return this.preferencesService.getPreferencesByUserId(params.id);
    }
    getUserRecommendation(params) {
        return this.preferencesService.getRecommendation(params.id);
    }
};
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreferencesController.prototype, "getUserPreferences", null);
__decorate([
    (0, common_1.Get)('/recommendation/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PreferencesController.prototype, "getUserRecommendation", null);
PreferencesController = __decorate([
    (0, common_1.Controller)('/preferences'),
    __metadata("design:paramtypes", [preferences_service_1.PreferencesService])
], PreferencesController);
exports.PreferencesController = PreferencesController;
//# sourceMappingURL=preferences.controller.js.map