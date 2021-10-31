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
import { SongService } from './song.service';
import { CreateSongDto } from './dtos/create-song.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangeSongDto } from './dtos/change-song';

@Controller('/song')
export class SongController {
	constructor(private songService: SongService) {}

	@Post()
	@UseInterceptors(FileInterceptor('audio'))
	create(
		@Body() songDto: CreateSongDto,
		@UploadedFile() audio: Express.Multer.File,
	) {
		return this.songService.createSong(songDto, audio);
	}

	@Get()
	getAll() {
		return this.songService.getAllSongs();
	}

	@Get(':id')
	getById(@Param() params) {
		return this.songService.findSongById(params.id);
	}

	@Put(':id')
	changeSong(@Param() params, @Body() songDto: ChangeSongDto) {
		return this.songService.changeSongById(params.id, songDto);
	}

	@Delete()
	removeAll() {
		return this.songService.removeAllSongs();
	}

	@Delete(':id')
	removeById(@Param() params) {
		return this.songService.removeSongById(params.id);
	}
}
