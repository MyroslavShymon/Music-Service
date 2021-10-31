import {
	BadRequestException,
	HttpStatus,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entities';
import { FileType } from 'src/core/enums';
import { FileService } from 'src/core/modules/file/file.service';
import { getConnection, Repository } from 'typeorm';
import { CreateUserDto } from '../../core/dtos/create-user.dto';
import { RoleService } from '../role/role.service';
import { IDefaultSuccessResponse } from '../../core/interfaces/default-response.interface';
import { ChangeUserDto } from './dtos/change-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
	constructor(
		private fileService: FileService,
		private roleService: RoleService,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async createUser(
		dto: CreateUserDto,
		image?: Express.Multer.File,
	): Promise<User> {
		const imagePath = image
			? this.fileService.createFile(FileType.IMAGE, image)
			: null;
		const role = await this.roleService.getRoleByTitle('User');

		return this.userRepository.save({
			email: dto.email,
			password: dto.password,
			name: dto.name,
			image: imagePath,
			roles: [role],
		});
	}

	async getAllUsers(): Promise<User[]> {
		return this.userRepository.find();
	}

	async findUserById(id: number): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { id },
		});

		if (!user) {
			throw new NotFoundException(`Немає користувача з id ${id}`);
		}
		return user;
	}

	async findUserByEmail(email: string): Promise<User> {
		return this.userRepository.findOne({
			where: { email },
		});
	}

	async changeUserById(id: number, dto: ChangeUserDto): Promise<User> {
		const user = await this.findUserById(id);

		const passwordEquals: boolean = await bcrypt.compare(
			dto.password,
			user.password,
		);
		if (passwordEquals) {
			throw new UnauthorizedException({
				message: 'Ви хочете змінити пароль на той самий',
			});
		}
		const hashPassword = await bcrypt.hash(dto.password, 5);

		if (user.email === dto.email) {
			throw new BadRequestException(
				'Ви хочете змінити електрону адресу на ту саму',
			);
		}
		if (user.name === dto.name) {
			throw new BadRequestException('Ви хочете змінити нікнейм на той самий');
		}

		user.email = dto.email;
		user.name = dto.name;
		user.password = hashPassword;

		return this.userRepository.save(user);
	}

	async removeAllUsers(): Promise<IDefaultSuccessResponse> {
		await getConnection().createQueryBuilder().delete().from(User).execute();
		return {
			status: HttpStatus.OK,
			message: 'Ви видалили всі рядки',
		};
	}

	async removeUserById(id: number): Promise<IDefaultSuccessResponse> {
		await this.findUserById(id);
		await this.userRepository.delete(id);
		return {
			status: HttpStatus.OK,
			message: `Користувач з id ${id} була видалена`,
		};
	}
}
