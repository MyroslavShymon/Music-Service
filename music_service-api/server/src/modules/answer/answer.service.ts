import {
	BadRequestException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Answer, AnswerToTest } from 'src/core/entities';
import { IDefaultSuccessResponse } from 'src/core/interfaces/default-response.interface';
import { TestService } from '../test/test.service';
import { CreateAnswerDto } from './dtos/create-answer.dto';

@Injectable()
export class AnswerService {
	constructor(
		@InjectRepository(Answer)
		private readonly answerRepository: Repository<Answer>,
		@InjectRepository(AnswerToTest)
		private readonly answerToTestRepository: Repository<AnswerToTest>,
		private testService: TestService,
	) {}

	async createAnswer(dto: CreateAnswerDto): Promise<Answer> {
		const existedAnswer = await this.answerRepository.findOne({
			where: { title: dto.title },
		});
		if (existedAnswer) {
			throw new BadRequestException('Відповіть вже існує');
		}
		return this.answerRepository.save(dto);
	}

	async createAnswerToTestConnect(
		dto: CreateAnswerToTestDto,
	): Promise<AnswerToTest> {
		const test = await this.testService.findTestById(dto.testId);
		const nextTest = await this.testService.findTestById(dto.nextTestId);
		const answer = await this.findAnswerById(dto.answerId);

		// if (test && nextTest && answer) {
		return this.answerToTestRepository.save({
			answerId: answer.id,
			testId: test.id,
			nextTestId: nextTest.id,
		});
		// }
	}

	async getAllAnswers(
		testId: number,
		nextTestId: number,
	): Promise<Answer | Answer[]> {
		// localhost:5000/answer?testId=13&nextTestId=15
		if (!testId && !nextTestId) {
			return this.answerRepository.find();
		}
		// await this.testService.findTestById(testId);
		// await this.testService.findTestById(nextTestId);
		if (testId && !nextTestId) {
			return this.answerRepository
				.createQueryBuilder('answer')
				.leftJoinAndSelect('answer.answerToTests', 'test')
				.setParameters({ testId })
				.where('test.testId = :testId')
				.getOne();
		}

		if (!testId && nextTestId) {
			return this.answerRepository
				.createQueryBuilder('answer')
				.leftJoinAndSelect('answer.answerToTests', 'test')
				.setParameters({ nextTestId })
				.where('test.nextTestId = :nextTestId')
				.getOne();
		}

		const answer = await this.answerRepository
			.createQueryBuilder('answer')
			.leftJoinAndSelect('answer.answerToTests', 'test')
			.setParameters({ testId, nextTestId })
			.where('test.testId = :testId')
			.where('test.nextTestId = :nextTestId')
			.getOne();

		if (!answer) {
			throw new NotFoundException(`Не знайдено такої відповіді`);
		}

		return answer;
	}

	async findAnswerById(id: number): Promise<Answer> {
		const answer = await this.answerRepository.findOne({
			where: { id },
		});

		if (!answer) {
			throw new NotFoundException(`Немає відповіді з таким id ${id}`);
		}
		return answer;
	}

	async changeAnswerTitleById(id: number, title: string): Promise<Answer> {
		// if (!title) {
		//   throw new BadRequestException(
		//     'Ви не вказали назву на яку хочете змінити',
		//   );
		// }
		//TODO
		const answer = await this.findAnswerById(id);

		if (answer.title === title) {
			throw new BadRequestException('Ви не ідентичні назви');
		}
		answer.title = title;
		return this.answerRepository.save(answer);
	}

	async removeAllAnswers(): Promise<IDefaultSuccessResponse> {
		await getConnection().createQueryBuilder().delete().from(Answer).execute();
		return {
			status: HttpStatus.OK,
			message: 'Ви видалили всі рядки',
		};
	}

	async removeAnswerById(id: number): Promise<IDefaultSuccessResponse> {
		await this.findAnswerById(id);
		await this.answerRepository.delete(id);
		return {
			status: HttpStatus.OK,
			message: `Відповідь з id ${id} була видалена`,
		};
	}
}
