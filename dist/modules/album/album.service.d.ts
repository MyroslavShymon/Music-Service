/// <reference types="multer" />
import { Repository } from 'typeorm';
import { Album, AlbumToGenre } from 'src/core/entities';
import { IDefaultSuccessResponse } from 'src/core/interfaces/default-response.interface';
import { CreateAlbumrDto } from './dtos/create-album.dto';
import { ChangeAlbumDto } from './dtos/change-album.dto';
import { PerformerService } from '../performer/performer.service';
import { FileService } from 'src/core/modules/file/file.service';
import { CreateAlbumToGenreDto } from './dtos/create-album-genre.dto';
import { GenreService } from '../genre/genre.service';
export declare class AlbumService {
    private performerService;
    private genreService;
    private fileService;
    private readonly albumRepository;
    private readonly albumToGenreRepository;
    constructor(performerService: PerformerService, genreService: GenreService, fileService: FileService, albumRepository: Repository<Album>, albumToGenreRepository: Repository<AlbumToGenre>);
    createAlbum(dto: CreateAlbumrDto, image: Express.Multer.File): Promise<Album>;
    createAlbumToGenreConnect(dto: CreateAlbumToGenreDto): Promise<AlbumToGenre>;
    removeAllAlbums(): Promise<IDefaultSuccessResponse>;
    removeAlbumById(id: number): Promise<IDefaultSuccessResponse>;
    findAlbumById(id: number): Promise<Album>;
    getAllAlbums(): Promise<Album[]>;
    changeAlbumById(id: number, dto: ChangeAlbumDto): Promise<Album>;
}
