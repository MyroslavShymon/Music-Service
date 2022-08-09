import { ChangeRoleDto } from './dtos/change-role.dto';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RoleService } from './role.service';
import { GetRoleDto } from './dtos/get-role.dto';
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    create(roleDto: CreateRoleDto): Promise<import("../../core/entities/role.entity").Role>;
    getAll(): Promise<import("../../core/entities/role.entity").Role[]>;
    getById(params: any): Promise<import("../../core/entities/role.entity").Role>;
    getByTitle(getRoleDto: GetRoleDto): Promise<import("../../core/entities/role.entity").Role>;
    changeRole(params: any, roleDto: ChangeRoleDto): Promise<import("../../core/entities/role.entity").Role>;
    removeAll(): Promise<import("../../core/interfaces/default-response.interface").IDefaultSuccessResponse>;
    removeById(params: any): Promise<import("../../core/interfaces/default-response.interface").IDefaultSuccessResponse>;
}
