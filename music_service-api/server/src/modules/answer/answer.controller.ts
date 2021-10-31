import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { ChangeAnswerDto } from './dtos/change-answer.dto';
import { CreateAnswerDto } from './dtos/create-answer.dto';

@Controller('/answer')
export class AnswerController {
	constructor(private answerService: AnswerService) {}

	@Post()
	create(@Body() answerDto: CreateAnswerDto) {
		return this.answerService.createAnswer(answerDto);
	}

	@Post('/connect')
	createConnectToTest(@Body() answerDto: CreateAnswerToTestDto) {
		return this.answerService.createAnswerToTestConnect(answerDto);
	}

	@Get(':id')
	findById(@Param() params) {
		return this.answerService.findAnswerById(params.id);
	}

	@Put(':id')
	renameTitle(@Param() params, @Body() answerDto: ChangeAnswerDto) {
		return this.answerService.changeAnswerTitleById(params.id, answerDto.title);
	}

	@Get()
	getAll(@Query() query) {
		return this.answerService.getAllAnswers(query.testId, query.nextTestId);
	}

	@Delete()
	removeAll() {
		return this.answerService.removeAllAnswers();
	}

	@Delete(':id')
	removeById(@Param() params) {
		return this.answerService.removeAnswerById(params.id);
	}
}
