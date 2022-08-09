/// <reference types="multer" />
import { AlbumService } from './album.service';
import { ChangeAlbumDto } from './dtos/change-album.dto';
import { CreateAlbumrDto } from './dtos/create-album.dto';
import { CreateAlbumToGenreDto } from './dtos/create-album-genre.dto';
export declare class AlbumController {
    private albumService;
    constructor(albumService: AlbumService);
    create(albumDto: CreateAlbumrDto, image: Express.Multer.File): Promise<import("../../core/entities").Album>;
    createConnectToGenre(albumDto: CreateAlbumToGenreDto): Promise<import("../../core/entities").AlbumToGenre>;
    findAll(): Promise<import("../../core/entities").Album[]>;
    findById(params: any): Promise<import("../../core/entities").Album>;
    renameTitle(params: any, albumDto: ChangeAlbumDto): Promise<import("../../core/entities").Album>;
    removeAll(): Promise<import("../../core/interfaces/default-response.interface").IDefaultSuccessResponse>;
    removeById(params: any): Promise<import("../../core/interfaces/default-response.interface").IDefaultSuccessResponse>;
}
