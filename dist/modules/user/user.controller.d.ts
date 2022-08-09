/// <reference types="multer" />
import { CreateUserDto } from '../../core/dtos/create-user.dto';
import { UserService } from './user.service';
import { ChangeUserDto } from './dtos/change-user.dto';
import { RoleDto } from './dtos/role.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(userDto: CreateUserDto, image: Express.Multer.File): Promise<import("../../core/entities").User>;
    addRole(roleDto: RoleDto, params: any): Promise<any>;
    getAll(): Promise<import("../../core/entities").User[]>;
    getById(params: any): Promise<import("../../core/entities").User>;
    getByEmail(query: any): Promise<import("../../core/entities").User>;
    changeUser(params: any, userDto: ChangeUserDto): Promise<import("../../core/entities").User>;
    removeById(params: any): Promise<import("../../core/interfaces/default-response.interface").IDefaultSuccessResponse>;
    removeAll(): Promise<import("../../core/interfaces/default-response.interface").IDefaultSuccessResponse>;
}
