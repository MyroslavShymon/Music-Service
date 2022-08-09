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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../core/entities");
const enums_1 = require("../../core/enums");
const file_service_1 = require("../../core/modules/file/file.service");
const typeorm_2 = require("typeorm");
const role_service_1 = require("../role/role.service");
let UserService = class UserService {
    constructor(fileService, roleService, userRepository) {
        this.fileService = fileService;
        this.roleService = roleService;
        this.userRepository = userRepository;
    }
    async createUser(dto, image) {
        const imagePath = this.fileService.createFile(enums_1.FileType.IMAGE, image);
        const role = await this.roleService.getRoleByTitle('User');
        return this.userRepository.save({
            email: dto.email,
            password: dto.password,
            name: dto.name,
            image: imagePath,
            roles: [role],
        });
    }
    async getAllUsers() {
        return this.userRepository.find();
    }
    async findUserById(id) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Немає користувача з id ${id}`);
        }
        return user;
    }
    async findUserByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Немає користувача з електронним адресом: ${email}`);
        }
        return user;
    }
    async changeUserById(id, dto) {
        const user = await this.findUserById(id);
        if (user.email === dto.email) {
            throw new common_1.BadRequestException('Ви хочете змінити електрону адресу на ту саму');
        }
        if (user.name === dto.name) {
            throw new common_1.BadRequestException('Ви хочете змінити нікнейм на той самий');
        }
        user.email = dto.email;
        user.name = dto.name;
        return this.userRepository.save(user);
    }
    async removeAllUsers() {
        await (0, typeorm_2.getConnection)().createQueryBuilder().delete().from(entities_1.User).execute();
        return {
            status: common_1.HttpStatus.OK,
            message: 'Ви видалили всі рядки',
        };
    }
    async removeUserById(id) {
        await this.findUserById(id);
        await this.userRepository.delete(id);
        return {
            status: common_1.HttpStatus.OK,
            message: `Користувач з id ${id} була видалена`,
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [file_service_1.FileService,
        role_service_1.RoleService,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map