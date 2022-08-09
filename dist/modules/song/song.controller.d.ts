/// <reference types="multer" />
import { SongService } from './song.service';
import { CreateSongDto } from './dtos/create-song.dto';
import { ChangeSongDto } from './dtos/change-song';
export declare class SongController {
    private songService;
    constructor(songService: SongService);
    create(songDto: CreateSongDto, audio: Express.Multer.File): Promise<import("../../core/entities").Song>;
    getAll(): Promise<import("../../core/entities").Song[]>;
    getById(params: any): Promise<import("../../core/entities").Song>;
    changeSong(params: any, songDto: ChangeSongDto): Promise<import("../../core/entities").Song>;
    removeAll(): Promise<import("../../core/interfaces/default-response.interface").IDefaultSuccessResponse>;
    removeById(params: any): Promise<import("../../core/interfaces/default-response.interface").IDefaultSuccessResponse>;
}
