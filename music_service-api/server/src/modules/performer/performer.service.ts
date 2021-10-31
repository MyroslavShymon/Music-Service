import {
	BadRequestException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Performer } from 'src/core/entities';
import { CreatePerformerDto } from './dtos/create-performer.dto';
import { IDefaultSuccessResponse } from 'src/core/interfaces/default-response.interface';
import { ChangePerformerDto } from './dtos/change-performer.dto';
import { FileService } from 'src/core/modules/file/file.service';
import { FileType } from 'src/core/enums';
import { RelationCountMetadata } from 'typeorm/metadata/RelationCountMetadata';

@Injectable()
export class PerformerService {
	constructor(
		private fileService: FileService,
		@InjectRepository(Performer)
		private readonly performerRepository: Repository<Performer>,
	) {}

	async createPerformer(
		dto: CreatePerformerDto,
		image: Express.Multer.File,
	): Promise<Performer> {
		const existedPerformer = await this.performerRepository.findOne({
			where: { title: dto.title },
		});

		if (existedPerformer) {
			throw new BadRequestException('Виконавець з таким іменем вже існує');
		}

		const imagePath = this.fileService.createFile(FileType.IMAGE, image);

		return this.performerRepository.save({
			title: dto.title,
			description: dto.description,
			image: imagePath,
		});
	}

	async removeAllPerformers(): Promise<IDefaultSuccessResponse> {
		await getConnection()
			.createQueryBuilder()
			.delete()
			.from(Performer)
			.execute();
		return {
			status: HttpStatus.OK,
			message: 'Ви видалили всі рядки',
		};
	}

	async removePerformerById(id: number): Promise<IDefaultSuccessResponse> {
		await this.findPerformerById(id);
		await this.performerRepository.delete(id);
		return {
			status: HttpStatus.OK,
			message: `Виконавець з id ${id} була видалена`,
		};
	}

	async findPerformerById(id: number): Promise<Performer> {
		const performer = await this.performerRepository.findOne({
			where: { id },
		});

		if (!performer) {
			throw new NotFoundException(`Немає виконавця з таким id ${id}`);
		}
		return performer;
	}

	async getAllPerformers(): Promise<Performer[]> {
		return this.performerRepository.find();
	}

	async changePerformerById(
		id: number,
		dto: ChangePerformerDto,
	): Promise<Performer> {
		const performer = await this.findPerformerById(id);

		if (performer.title === dto.title) {
			throw new BadRequestException(
				'Ви хочете змінити назву виконавця на ту ж саму',
			);
		}
		if (performer.description === dto.description) {
			throw new BadRequestException(
				'Ви хочете змінити опис виконавця на ту ж саму',
			);
		}

		performer.title = dto.title;
		performer.description = dto.description;

		return this.performerRepository.save(performer);
	}
}
