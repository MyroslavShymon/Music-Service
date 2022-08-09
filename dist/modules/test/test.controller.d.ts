import { ChangeTestDto } from './dtos/change-test.dto';
import { CreateTestDto } from './dtos/create-test.dto';
import { TestService } from './test.service';
export declare class TestController {
    private testService;
    constructor(testService: TestService);
    create(testDto: CreateTestDto): Promise<import("../../core/entities").Test>;
    getAll(): Promise<import("../../core/entities").Test[]>;
    getById(params: any): Promise<import("../../core/entities").Test>;
    changeTitle(params: any, answerDto: ChangeTestDto): Promise<import("../../core/entities").Test>;
    removeAll(): Promise<import("../../core/interfaces/default-response.interface").IDefaultSuccessResponse>;
    removeById(params: any): Promise<import("../../core/interfaces/default-response.interface").IDefaultSuccessResponse>;
}
