/// <reference types="multer" />
import { ChangeGenreDto } from './dtos/change-genre.dto';
import { createGenreAnswerConnectionDto } from './dtos/create-genre-answer.dto';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { GenreService } from './genre.service';
export declare class GenreController {
    private genreService;
    constructor(genreService: GenreService);
    create(genreDto: CreateGenreDto, image: Express.Multer.File): Promise<import("../../core/entities").Genre>;
    createAnswerConnect(genreAnswerDto: createGenreAnswerConnectionDto): Promise<any>;
    getAll(): Promise<import("../../core/entities").Genre[]>;
    getById(params: any): Promise<import("../../core/entities").Genre>;
    changeGenre(params: any, genreDto: ChangeGenreDto): Promise<import("../../core/entities").Genre>;
    removeAll(): Promise<import("../../core/interfaces/default-response.interface").IDefaultSuccessResponse>;
    removeById(params: any): Promise<import("../../core/interfaces/default-response.interface").IDefaultSuccessResponse>;
}