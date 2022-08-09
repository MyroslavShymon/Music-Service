/// <reference types="multer" />
import { ChangeGenreDto } from './dtos/change-genre.dto';
import { createGenreAnswerConnectionDto } from './dtos/create-genre-answer.dto';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { GenreService } from './genre.service';
export declare class GenreController {
    private genreService;
    constructor(genreService: GenreService);
    create(genreDto: CreateGenreDto, image: Express.Multer.File): any;
    createAnswerConnect(genreAnswerDto: createGenreAnswerConnectionDto): any;
    getAll(): any;
    getById(params: any): any;
    changeGenre(params: any, genreDto: ChangeGenreDto): any;
    removeAll(): any;
    removeById(params: any): any;
}
