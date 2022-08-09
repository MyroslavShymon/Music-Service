import { Repository } from 'typeorm';
import { Answer, AnswerToTest } from 'src/core/entities';
import { IDefaultSuccessResponse } from 'src/core/interfaces/default-response.interface';
import { TestService } from '../test/test.service';
import { CreateAnswerDto } from './dtos/create-answer.dto';
export declare class AnswerService {
    private readonly answerRepository;
    private readonly answerToTestRepository;
    private testService;
    constructor(answerRepository: Repository<Answer>, answerToTestRepository: Repository<AnswerToTest>, testService: TestService);
    createAnswer(dto: CreateAnswerDto): Promise<Answer>;
    createAnswerToTestConnect(dto: CreateAnswerToTestDto): Promise<AnswerToTest>;
    getAllAnswers(testId: number, nextTestId: number): Promise<Answer | Answer[]>;
    findAnswerById(id: number): Promise<Answer>;
    changeAnswerTitleById(id: number, title: string): Promise<Answer>;
    removeAllAnswers(): Promise<IDefaultSuccessResponse>;
    removeAnswerById(id: number): Promise<IDefaultSuccessResponse>;
}
