import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer, AnswerToTest, Test } from 'src/core/entities';
import { TestService } from '../test/test.service';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';

@Module({
	controllers: [AnswerController],
	providers: [AnswerService, TestService],
	imports: [TypeOrmModule.forFeature([Answer, AnswerToTest, Test])],
	exports: [AnswerService],
})
export class AnswerModule {}
