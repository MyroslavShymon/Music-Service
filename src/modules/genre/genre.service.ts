import {
	BadRequestException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerToGenre, Genre, Preferences } from 'src/core/entities';
import { IDefaultSuccessResponse } from 'src/core/interfaces/default-response.interface';
import { ChangeGenreDto } from './dtos/change-genre.dto';
import { createGenreAnswerConnectionDto } from './dtos/create-genre-answer.dto';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { IAnswerToGenreResponse } from './interfaces/answer-to-genre-response.interface';
import { AnswerService } from '../answer/answer.service';
import { FileService } from 'src/core/modules/file/file.service';
import { FileType } from 'src/core/enums';
import { PreferencesService } from '../preferences/preferences.service';
import { answerQuestionDto } from './dtos/answer-question.dto';

@Injectable()
export class GenreService {
	constructor(
		private fileService: FileService,
		private answerService: AnswerService,
		private preferencesService: PreferencesService,
		@InjectRepository(Genre)
		private readonly genreRepository: Repository<Genre>,
		@InjectRepository(AnswerToGenre)
		private readonly answerToGenreRepository: Repository<AnswerToGenre>,
	) {}

	async createGenre(
		dto: CreateGenreDto,
		image: Express.Multer.File,
	): Promise<Genre> {
		const existedGenre = await this.genreRepository.findOne({
			where: { title: dto.title },
		});

		if (existedGenre) {
			throw new BadRequestException('Жанр вже існує');
		}

		const imagePath = image
			? this.fileService.createFile(FileType.IMAGE, image)
			: null;

		const genre = await this.genreRepository.save({
			title: dto.title,
			description: dto.description,
			image: imagePath,
		});

		await this.preferencesService.addPreferenceWhenGenreCreate(genre.id);

		return genre;
	}

	async createGenreToAnswerConnect(
		dto: createGenreAnswerConnectionDto,
	): Promise<IAnswerToGenreResponse> {
		console.log('dto', dto);
		const answer = await this.answerService.findAnswerById(dto.answerId);
		const genre = await this.findGenreById(dto.genreId);

		return this.answerToGenreRepository.save({
			genreId: genre.id,
			answerId: answer.id,
			weight: dto.weight,
		});
	}

	async answerTheQuestion(
		dto: answerQuestionDto,
	): Promise<IDefaultSuccessResponse> {
		const { answerId, userId } = dto;
		const answers = await this.answerToGenreRepository.find({
			where: { answerId },
		});

		try {
			for (let i = 0; i < answers.length; i++)
				await this.preferencesService.addWeight(
					answers[i].genreId,
					userId,
					answers[i].weight,
				);
		} catch (e) {
			throw new BadRequestException(e);
		}

		return {
			status: HttpStatus.OK,
			message: `Відповідь дана`,
		};
	}

	async getAllGenres(): Promise<Genre[]> {
		return this.genreRepository.find();
	}

	async findGenreById(id: number): Promise<Genre> {
		const genre = await this.genreRepository.findOne({ where: { id } });
		console.log('genre', id);
		if (!genre) {
			throw new NotFoundException(`Немає жанру з таким id ${id}`);
		}

		return genre;
	}

	async changeGenreById(id: number, dto: ChangeGenreDto): Promise<Genre> {
		const genre = await this.findGenreById(id);

		if (genre.title === dto.title) {
			throw new BadRequestException('Жанру має таку ж саму назву');
		}
		if (genre.description === dto.description) {
			throw new BadRequestException('Жанр має таке ж саме описання');
		}

		genre.title = dto.title;
		genre.description = dto.description;

		return this.genreRepository.save(genre);
	}

	async removeAllGenres(): Promise<IDefaultSuccessResponse> {
		await getConnection().createQueryBuilder().delete().from(Genre).execute();
		return {
			status: HttpStatus.OK,
			message: 'Ви видалили всі рядки',
		};
	}

	async removeGenreById(id: number): Promise<IDefaultSuccessResponse> {
		await this.findGenreById(id);
		await this.genreRepository.delete(id);
		return {
			status: HttpStatus.OK,
			message: `Жанр з id ${id} був видалений`,
		};
	}
}
