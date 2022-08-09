import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	Answer,
	AnswerToGenre,
	AnswerToTest,
	Genre,
	Test,
} from 'src/core/entities';
import { FileService } from 'src/core/modules/file/file.service';
import { AnswerService } from '../answer/answer.service';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { PreferencesModule } from '../preferences/preferences.module';
import { AnswerModule } from '../answer/answer.module';
import { PreferencesService } from '../preferences/preferences.service';

@Module({
	controllers: [GenreController],
	providers: [GenreService, FileService],
	imports: [
		TypeOrmModule.forFeature([Genre, Answer, AnswerToGenre]),
		AnswerModule,
		PreferencesModule,
	],
	exports: [GenreService],
})
export class GenreModule {}
