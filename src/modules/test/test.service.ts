import {
	BadRequestException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from 'src/core/entities';
import { IDefaultSuccessResponse } from 'src/core/interfaces/default-response.interface';
import { CreateTestDto } from './dtos/create-test.dto';

@Injectable()
export class TestService {
	constructor(
		@InjectRepository(Test)
		private readonly testRepository: Repository<Test>,
	) {}

	async createTest(dto: CreateTestDto): Promise<Test> {
		const existedTest = await this.testRepository.findOne({
			where: { title: dto.title },
		});

		if (existedTest) {
			throw new BadRequestException('Тест вже існує');
		}
		return this.testRepository.save(dto);
	}

	async getAllTests(): Promise<Test[]> {
		return this.testRepository.find();
	}

	async findTestById(id: number): Promise<Test> {
		const test = await this.testRepository.findOne({ where: { id } });
		if (!test) {
			throw new NotFoundException(`Немає тесту з таким id ${id}`);
		}
		return test;
	}

	async changeTestTitleById(id: number, title: string): Promise<Test> {
		const test = await this.findTestById(id);

		if (test.title === title) {
			throw new BadRequestException('Тест має таку ж саму назву');
		}

		test.title = title;
		return this.testRepository.save(test);
	}

	async removeAllTests(): Promise<IDefaultSuccessResponse> {
		await getConnection().createQueryBuilder().delete().from(Test).execute();
		return {
			status: HttpStatus.OK,
			message: 'Ви видалили всі рядки',
		};
	}

	async removeTestById(id: number): Promise<IDefaultSuccessResponse> {
		await this.findTestById(id);
		await this.testRepository.delete(id);

		return {
			status: HttpStatus.OK,
			message: `Тест з id ${id} був видалений`,
		};
	}
}
