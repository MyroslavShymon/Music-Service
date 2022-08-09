/// <reference types="multer" />
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { IToken } from '../../core/interfaces/token.interface';
import { TokenService } from '../../core/modules/token/token.service';
import { CreateUserDto } from '../../core/dtos/create-user.dto';
import { PreferencesService } from '../preferences/preferences.service';
export declare class AuthService {
    private userService;
    private tokenService;
    private preferencesService;
    constructor(userService: UserService, tokenService: TokenService, preferencesService: PreferencesService);
    login(dto: LoginUserDto): Promise<IToken>;
    private validateUser;
    registration(dto: CreateUserDto, image: Express.Multer.File): Promise<IToken>;
}
