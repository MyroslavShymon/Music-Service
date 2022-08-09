/// <reference types="multer" />
import { User } from 'src/core/entities';
import { FileService } from 'src/core/modules/file/file.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../core/dtos/create-user.dto';
import { RoleService } from '../role/role.service';
import { IDefaultSuccessResponse } from '../../core/interfaces/default-response.interface';
import { ChangeUserDto } from './dtos/change-user.dto';
export declare class UserService {
    private fileService;
    private roleService;
    private readonly userRepository;
    constructor(fileService: FileService, roleService: RoleService, userRepository: Repository<User>);
    createUser(dto: CreateUserDto, image?: Express.Multer.File): Promise<User>;
    addRoleToUser(userId: number, roleTitle: string): Promise<any>;
    getAllUsers(): Promise<User[]>;
    getUserWithRoleByUserId(id: number): Promise<User>;
    getUserWithRoleByEmail(email: string): Promise<User>;
    findUserById(id: number): Promise<User>;
    findUserByEmail(email: string): Promise<User>;
    changeUserById(id: number, dto: ChangeUserDto): Promise<User>;
    removeAllUsers(): Promise<IDefaultSuccessResponse>;
    removeUserById(id: number): Promise<IDefaultSuccessResponse>;
}
