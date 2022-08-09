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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const change_role_dto_1 = require("./dtos/change-role.dto");
const create_role_dto_1 = require("./dtos/create-role.dto");
const role_service_1 = require("./role.service");
const get_role_dto_1 = require("./dtos/get-role.dto");
let RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    create(roleDto) {
        return this.roleService.createRole(roleDto);
    }
    getAll() {
        return this.roleService.getAllRoles();
    }
    getById(params) {
        return this.roleService.findRoleById(params.id);
    }
    getByTitle(getRoleDto) {
        return this.roleService.getRoleByTitle(getRoleDto.title);
    }
    changeRole(params, roleDto) {
        return this.roleService.changeRoleById(params.id, roleDto);
    }
    removeAll() {
        return this.roleService.removeAllRoles();
    }
    removeById(params) {
        return this.roleService.removeRoleById(params.id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('/title'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_role_dto_1.GetRoleDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getByTitle", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_role_dto_1.ChangeRoleDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "changeRole", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "removeAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "removeById", null);
RoleController = __decorate([
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map