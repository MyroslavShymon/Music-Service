import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from '../../core/dtos/create-user.dto';
import { UserService } from './user.service';
import { ChangeUserDto } from './dtos/change-user.dto';
import { RoleDto } from './dtos/role.dto';

@Controller('/user')
export class UserController {
	constructor(private userService: UserService) {}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	create(
		@Body() userDto: CreateUserDto,
		@UploadedFile() image: Express.Multer.File,
	) {
		return this.userService.createUser(userDto, image);
	}

	@Post('/add-role/:id')
	addRole(@Body() roleDto: RoleDto, @Param() params) {
		return this.userService.addRoleToUser(params.id, roleDto.title);
	}

	@Get()
	getAll() {
		return this.userService.getAllUsers();
	}

	@Get(':id')
	getById(@Param() params) {
		return this.userService.findUserById(params.id);
	}

	@Get('/email')
	getByEmail(@Query() query) {
		return this.userService.findUserByEmail(query.email);
	}

	@Put(':id')
	changeUser(@Param() params, @Body() userDto: ChangeUserDto) {
		return this.userService.changeUserById(params.id, userDto);
	}

	@Delete(':id')
	removeById(@Param() params) {
		return this.userService.removeUserById(params.id);
	}

	@Delete()
	removeAll() {
		return this.userService.removeAllUsers();
	}
}
