import { AnswerService } from './answer.service';
import { ChangeAnswerDto } from './dtos/change-answer.dto';
import { CreateAnswerDto } from './dtos/create-answer.dto';
export declare class AnswerController {
    private answerService;
    constructor(answerService: AnswerService);
    create(answerDto: CreateAnswerDto): Promise<import("../../core/entities").Answer>;
    createConnectToTest(answerDto: CreateAnswerToTestDto): Promise<import("../../core/entities").AnswerToTest>;
    findById(params: any): Promise<import("../../core/entities").Answer>;
    renameTitle(params: any, answerDto: ChangeAnswerDto): Promise<import("../../core/entities").Answer>;
    getAll(query: any): Promise<import("../../core/entities").Answer | import("../../core/entities").Answer[]>;
    removeAll(): Promise<import("../../core/interfaces/default-response.interface").IDefaultSuccessResponse>;
    removeById(params: any): Promise<import("../../core/interfaces/default-response.interface").IDefaultSuccessResponse>;
}
