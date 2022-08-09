/// <reference types="multer" />
import { Repository } from 'typeorm';
import { Song } from 'src/core/entities';
import { CreateSongDto } from './dtos/create-song.dto';
import { AlbumService } from '../album/album.service';
import { FileService } from 'src/core/modules/file/file.service';
import { IDefaultSuccessResponse } from 'src/core/interfaces/default-response.interface';
import { ChangeSongDto } from './dtos/change-song';
export declare class SongService {
    private albumService;
    private fileService;
    private readonly songRepository;
    constructor(albumService: AlbumService, fileService: FileService, songRepository: Repository<Song>);
    createSong(dto: CreateSongDto, audio: Express.Multer.File): Promise<Song>;
    removeAllSongs(): Promise<IDefaultSuccessResponse>;
    removeSongById(id: number): Promise<IDefaultSuccessResponse>;
    findSongById(id: number): Promise<Song>;
    getAllSongs(): Promise<Song[]>;
    changeSongById(id: number, dto: ChangeSongDto): Promise<Song>;
}
