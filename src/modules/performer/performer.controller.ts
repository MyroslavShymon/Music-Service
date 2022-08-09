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
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangePerformerDto } from './dtos/change-performer.dto';
import { CreatePerformerDto } from './dtos/create-performer.dto';
import { PerformerService } from './performer.service';

@Controller('/performer')
export class PerformerController {
	constructor(private performerService: PerformerService) {}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	create(
		@Body() performerDto: CreatePerformerDto,
		@UploadedFile() image: Express.Multer.File,
	) {
		return this.performerService.createPerformer(performerDto, image);
	}

	@Get()
	getAll() {
		return this.performerService.getAllPerformers();
	}

	@Get(':id')
	getById(@Param() params) {
		return this.performerService.findPerformerById(params.id);
	}

	@Put(':id')
	changePerformer(@Param() params, @Body() performerDto: ChangePerformerDto) {
		return this.performerService.changePerformerById(params.id, performerDto);
	}

	@Delete()
	removeAll() {
		return this.performerService.removeAllPerformers();
	}

	@Delete(':id')
	removeById(@Param() params) {
		return this.performerService.removePerformerById(params.id);
	}
}
