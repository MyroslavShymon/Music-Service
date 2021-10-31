import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangeGenreDto } from './dtos/change-genre.dto';
import { createGenreAnswerConnectionDto } from './dtos/create-genre-answer.dto';
// import { ChangeGenreDto } from './dtos/change-genre.dto';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { GenreService } from './genre.service';
import { answerQuestionDto } from './dtos/answer-question.dto';

@Controller('/genre')
export class GenreController {
	constructor(private genreService: GenreService) {}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	create(
		@Body() genreDto: CreateGenreDto,
		@UploadedFile() image: Express.Multer.File,
	) {
		return this.genreService.createGenre(genreDto, image);
	}

	@Post('/connect')
	createAnswerConnect(@Body() genreAnswerDto: createGenreAnswerConnectionDto) {
		return this.genreService.createGenreToAnswerConnect(genreAnswerDto);
	}

	@Post('/answer-question')
	answerQuestion(@Body() answerQuestionDto: answerQuestionDto) {
		return this.genreService.answerTheQuestion(answerQuestionDto);
	}

	@Get()
	getAll() {
		return this.genreService.getAllGenres();
	}

	// @Get('/random')
	// getRandomAlbums() {
	// 	return this.genreService.getRandomAlbumsByGenres();
	// }

	@Get(':id')
	getById(@Param() params) {
		return this.genreService.findGenreById(params.id);
	}

	@Put(':id')
	changeGenre(@Param() params, @Body() genreDto: ChangeGenreDto) {
		return this.genreService.changeGenreById(params.id, genreDto);
	}

	@Delete()
	removeAll() {
		return this.genreService.removeAllGenres();
	}

	@Delete(':id')
	removeById(@Param() params) {
		return this.genreService.removeGenreById(params.id);
	}
	//view with CRUD
	//filter search sort
	//action query
	//export word звіт report
	//trigger
	//хранімі процедури
	//трпнхакциї
	//адмініструванняуп
}
