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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcryptjs");
const token_service_1 = require("../../core/modules/token/token.service");
let AuthService = class AuthService {
    constructor(userService, tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }
    async login(dto) {
        const user = await this.validateUser(dto);
        return this.tokenService.generateToken(user);
    }
    async validateUser(dto) {
        const user = await this.userService.getUserWithRoleByEmail(dto.email);
        if (!user) {
            throw new common_1.UnauthorizedException({
                message: 'Немає користувача з вказаною електронною адресою',
            });
        }
        const passwordEquals = await bcrypt.compare(dto.password, user.password);
        if (!passwordEquals) {
            throw new common_1.UnauthorizedException({
                message: 'Не коректний пароль',
            });
        }
        return user;
    }
    async registration(dto) {
        const candidate = await this.userService.findUserByEmail(dto.email);
        if (candidate) {
            throw new common_1.UnauthorizedException({
                message: 'Вже існує користувач з вказаною електронною адресою',
            });
        }
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userService.createUser(Object.assign(Object.assign({}, dto), { password: hashPassword }));
        return this.tokenService.generateToken(user);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        token_service_1.TokenService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map