import {
	BadRequestException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Album, Song } from 'src/core/entities';
import { CreateSongDto } from './dtos/create-song.dto';
import { AlbumService } from '../album/album.service';
import { FileService } from 'src/core/modules/file/file.service';
import { FileType } from 'src/core/enums';
import { IDefaultSuccessResponse } from 'src/core/interfaces/default-response.interface';
import { ChangeSongDto } from './dtos/change-song';

@Injectable()
export class SongService {
	constructor(
		private albumService: AlbumService,
		private fileService: FileService,
		@InjectRepository(Song)
		private readonly songRepository: Repository<Song>,
	) {}

	async createSong(
		dto: CreateSongDto,
		audio: Express.Multer.File,
	): Promise<Song> {
		const existedSongAtAlbum = await this.songRepository
			.createQueryBuilder('song')
			.leftJoinAndSelect('song.album', 'album')
			.setParameters({ albumId: dto.albumId, title: dto.title })
			.where('album.id = :albumId')
			.where('song.title = :title')
			.getOne();

		if (existedSongAtAlbum) {
			throw new BadRequestException(
				`Пісня з назвою ${existedSongAtAlbum.title} вже існує в альбмі`,
			);
		}

		const album: Album = await this.albumService.findAlbumById(dto.albumId);
		const audioPath = this.fileService.createFile(FileType.AUDIO, audio);

		return this.songRepository.save({
			title: dto.title,
			text: dto.text,
			audio: audioPath,
			album,
		});
	}

	async removeAllSongs(): Promise<IDefaultSuccessResponse> {
		await getConnection().createQueryBuilder().delete().from(Song).execute();
		return {
			status: HttpStatus.OK,
			message: 'Ви видалили всі рядки',
		};
	}

	async removeSongById(id: number): Promise<IDefaultSuccessResponse> {
		await this.findSongById(id);
		await this.songRepository.delete(id);
		return {
			status: HttpStatus.OK,
			message: `Пісня з id ${id} була видалена`,
		};
	}

	async findSongById(id: number): Promise<Song> {
		const song = await this.songRepository.findOne({
			where: { id },
		});

		if (!song) {
			throw new NotFoundException(`Немає пісні з таким id ${id}`);
		}
		return song;
	}

	async getAllSongs(): Promise<Song[]> {
		return this.songRepository.find();
	}

	async changeSongById(id: number, dto: ChangeSongDto): Promise<Song> {
		const song = await this.findSongById(id);

		if (song.title === dto.title) {
			throw new BadRequestException(
				'Ви хочете змінити назву пісні на ту ж саму',
			);
		}
		if (song.text === dto.text) {
			throw new BadRequestException(
				'Ви хочете змінити текст пісні на ту ж саму',
			);
		}

		song.title = dto.title;
		song.text = dto.text;

		return this.songRepository.save(song);
	}
}
