import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlbumService } from './album.service';
import { ChangeAlbumDto } from './dtos/change-album.dto';
import { CreateAlbumrDto } from './dtos/create-album.dto';
import { CreateAlbumToGenreDto } from './dtos/create-album-genre.dto';

@Controller('/album')
export class AlbumController {
	constructor(private albumService: AlbumService) {}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	create(
		@Body() albumDto: CreateAlbumrDto,
		@UploadedFile() image: Express.Multer.File,
	) {
		return this.albumService.createAlbum(albumDto, image);
	}

	@Post('/connect')
	createConnectToGenre(@Body() albumDto: CreateAlbumToGenreDto) {
		return this.albumService.createAlbumToGenreConnect(albumDto);
	}
	@Get()
	findAll() {
		return this.albumService.getAllAlbums();
	}

	@Get(':id')
	findById(@Param() params) {
		return this.albumService.findAlbumById(params.id);
	}

	@Put(':id')
	renameTitle(@Param() params, @Body() albumDto: ChangeAlbumDto) {
		return this.albumService.changeAlbumById(params.id, albumDto);
	}

	@Delete()
	removeAll() {
		return this.albumService.removeAllAlbums();
	}

	@Delete(':id')
	removeById(@Param() params) {
		return this.albumService.removeAlbumById(params.id);
	}
}
