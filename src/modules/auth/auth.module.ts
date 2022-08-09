import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../core/entities';
import { Role } from '../../core/entities/role.entity';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../../core/modules';
import { PreferencesModule } from '../preferences/preferences.module';

@Module({
	providers: [AuthService],
	imports: [
		TypeOrmModule.forFeature([User, Role]),
		UserModule,
		TokenModule,
		PreferencesModule,
	],
	controllers: [AuthController],
})
export class AuthModule {}
