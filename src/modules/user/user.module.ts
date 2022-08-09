import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/core/entities/role.entity';
import { FileService } from 'src/core/modules/file/file.service';
import { RoleService } from '../role/role.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Genre, Preferences, User } from '../../core/entities';

@Module({
	controllers: [UserController],
	providers: [UserService, FileService, RoleService],
	imports: [TypeOrmModule.forFeature([User, Role, Preferences, Genre])],
	exports: [UserService],
})
export class UserModule {}
