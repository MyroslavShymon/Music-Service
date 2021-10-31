import {
	BadRequestException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Album, AlbumToGenre } from 'src/core/entities';
import { IDefaultSuccessResponse } from 'src/core/interfaces/default-response.interface';
import { CreateAlbumrDto } from './dtos/create-album.dto';
import { ChangeAlbumDto } from './dtos/change-album.dto';
import { PerformerService } from '../performer/performer.service';
import { FileType } from 'src/core/enums';
import { FileService } from 'src/core/modules/file/file.service';
import { CreateAlbumToGenreDto } from './dtos/create-album-genre.dto';
import { GenreService } from '../genre/genre.service';

@Injectable()
export class AlbumService {
	constructor(
		private performerService: PerformerService,
		private genreService: GenreService,
		private fileService: FileService,
		@InjectRepository(Album)
		private readonly albumRepository: Repository<Album>,
		@InjectRepository(AlbumToGenre)
		private readonly albumToGenreRepository: Repository<AlbumToGenre>,
	) {}

	async createAlbum(
		dto: CreateAlbumrDto,
		image: Express.Multer.File,
	): Promise<Album> {
		const existedAlbum = await this.albumRepository.findOne({
			where: { title: dto.title, year: dto.year },
		});

		if (existedAlbum) {
			throw new BadRequestException('Альбом вже існує');
		}

		const performer = await this.performerService.findPerformerById(
			dto.performerId,
		);

		if (!performer) {
			throw new NotFoundException('Такого виконавця не існує');
		}

		const imagePath = this.fileService.createFile(FileType.IMAGE, image);

		return this.albumRepository.save({
			title: dto.title,
			description: dto.description,
			year: dto.year,
			image: imagePath,
			performer,
		});
	}

	async createAlbumToGenreConnect(
		dto: CreateAlbumToGenreDto,
	): Promise<AlbumToGenre> {
		const album = await this.findAlbumById(dto.albumId);
		const genre = await this.genreService.findGenreById(dto.genreId);

		// if (test && nextTest && answer) {
		return this.albumToGenreRepository.save({
			albumId: album.id,
			genreId: genre.id,
		});
	}

	async removeAllAlbums(): Promise<IDefaultSuccessResponse> {
		await getConnection().createQueryBuilder().delete().from(Album).execute();
		return {
			status: HttpStatus.OK,
			message: 'Ви видалили всі рядки',
		};
	}

	async removeAlbumById(id: number): Promise<IDefaultSuccessResponse> {
		await this.findAlbumById(id);
		await this.albumRepository.delete(id);
		return {
			status: HttpStatus.OK,
			message: `Альбом з id ${id} була видалена`,
		};
	}

	async findAlbumById(id: number): Promise<Album> {
		const album = await this.albumRepository.findOne({ where: { id } });

		if (!album) {
			throw new NotFoundException(`Немає альбому з таким id ${id}`);
		}
		return album;
	}

	async getAllAlbums(): Promise<Album[]> {
		return this.albumRepository.find();
	}

	async changeAlbumById(id: number, dto: ChangeAlbumDto): Promise<Album> {
		const album = await this.findAlbumById(id);

		if (album.title === dto.title) {
			throw new BadRequestException(
				'Ви хочете змінити назву альбома на ту ж саму',
			);
		}
		if (album.year === dto.year) {
			throw new BadRequestException(
				'Ви хочете змінити рік видачі альбома на той же саме',
			);
		}

		album.title = dto.title;
		album.year = dto.year;

		return this.albumRepository.save(album);
	}
}
