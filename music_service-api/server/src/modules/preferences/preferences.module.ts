import { Module } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { GenreModule } from '../genre/genre.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre, Preferences, User } from '../../core/entities';
import { Role } from '../../core/entities/role.entity';
import { UserModule } from '../user/user.module';

@Module({
	// imports: [ UserModule, TypeOrmModule.forFeature([Preferences])],
	imports: [TypeOrmModule.forFeature([Preferences, User, Genre])],
	providers: [PreferencesService],
	exports: [PreferencesService],
})
export class PreferencesModule {}
