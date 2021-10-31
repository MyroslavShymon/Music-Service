import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ChangeTestDto } from './dtos/change-test.dto';
import { CreateTestDto } from './dtos/create-test.dto';
import { TestService } from './test.service';

@Controller('/test')
export class TestController {
	constructor(private testService: TestService) {}

	@Post()
	create(@Body() testDto: CreateTestDto) {
		return this.testService.createTest(testDto);
	}

	@Get()
	getAll() {
		return this.testService.getAllTests();
	}

	@Get(':id')
	getById(@Param() params) {
		return this.testService.findTestById(params.id);
	}

	@Put(':id')
	changeTitle(@Param() params, @Body() answerDto: ChangeTestDto) {
		return this.testService.changeTestTitleById(params.id, answerDto.title);
	}

	@Delete()
	removeAll() {
		return this.testService.removeAllTests();
	}

	@Delete(':id')
	removeById(@Param() params) {
		return this.testService.removeTestById(params.id);
	}
}
