import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	AlbumModule,
	AnswerModule,
	AuthModule,
	GenreModule,
	PerformerModule,
	RoleModule,
	SongModule,
	TestModule,
	UserModule,
	PreferencesModule,
} from './modules';
import {
	Album,
	AlbumToGenre,
	Answer,
	AnswerToGenre,
	AnswerToTest,
	Genre,
	Performer,
	Preferences,
	Song,
	Test,
	User,
} from './core/entities';
import { FileModule, TokenModule } from './core/modules';
import { Role } from './core/entities/role.entity';
import { AllExceptionsFilters } from './core/filters/all-exceptions.filter';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: '22864231',
			database: 'music_service_3',
			entities: [
				User,
				Test,
				Answer,
				Genre,
				AnswerToGenre,
				Album,
				Song,
				Performer,
				Preferences,
				AnswerToTest,
				Role,
				AlbumToGenre,
			],
			synchronize: true,
			autoLoadEntities: true,
		}),
		TestModule,
		AnswerModule,
		GenreModule,
		AlbumModule,
		PerformerModule,
		SongModule,
		FileModule,
		AuthModule,
		UserModule,
		RoleModule,
		TokenModule,
		PreferencesModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilters,
		},
	],
})
export class AppModule {}
