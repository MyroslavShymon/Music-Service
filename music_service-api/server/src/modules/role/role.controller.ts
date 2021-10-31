import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { ChangeRoleDto } from './dtos/change-role.dto';
import { CreateRoleDto } from './dtos/create-role.dto';
import { RoleService } from './role.service';
import { GetRoleDto } from './dtos/get-role.dto';

@Controller('role')
export class RoleController {
	constructor(private roleService: RoleService) {}

	@Post()
	create(@Body() roleDto: CreateRoleDto) {
		return this.roleService.createRole(roleDto);
	}

	//   @Get()
	//   random() {
	// return this.roleService.random();
	//   }

	@Get()
	getAll() {
		return this.roleService.getAllRoles();
	}

	@Get(':id')
	getById(@Param() params) {
		return this.roleService.findRoleById(params.id);
	}

	@Get('/title')
	getByTitle(@Body() getRoleDto: GetRoleDto) {
		return this.roleService.getRoleByTitle(getRoleDto.title);
	}

	@Put(':id')
	changeRole(@Param() params, @Body() roleDto: ChangeRoleDto) {
		return this.roleService.changeRoleById(params.id, roleDto);
	}

	@Delete()
	removeAll() {
		return this.roleService.removeAllRoles();
	}

	@Delete(':id')
	removeById(@Param() params) {
		return this.roleService.removeRoleById(params.id);
	}
}
