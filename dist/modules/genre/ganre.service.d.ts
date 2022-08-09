/// <reference types="multer" />
import { Repository } from 'typeorm';
import { AnswerToGenre, Genre } from 'src/core/entities';
import { IDefaultSuccessResponse } from 'src/core/interfaces/default-response.interface';
import { ChangeGenreDto } from './dtos/change-genre.dto';
import { createGenreAnswerConnectionDto } from './dtos/create-genre-answer.dto';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { IAnswerToGenreResponse } from './interfaces/answer-to-genre-response.interface';
import { AnswerService } from '../answer/answer.service';
import { FileService } from 'src/core/modules/file/file.service';
export declare class GenreService {
    private fileService;
    private answerService;
    private readonly genreRepository;
    private readonly answerToGenreRepository;
    constructor(fileService: FileService, answerService: AnswerService, genreRepository: Repository<Genre>, answerToGenreRepository: Repository<AnswerToGenre>);
    createGenre(dto: CreateGenreDto, image: Express.Multer.File): Promise<Genre>;
    createGenreToAnswerConnect(dto: createGenreAnswerConnectionDto): Promise<IAnswerToGenreResponse>;
    getAllGenres(): Promise<Genre[]>;
    findGenreById(id: number): Promise<Genre>;
    changeGenreById(id: number, dto: ChangeGenreDto): Promise<Genre>;
    removeAllGenres(): Promise<IDefaultSuccessResponse>;
    removeGenreById(id: number): Promise<IDefaultSuccessResponse>;
}
