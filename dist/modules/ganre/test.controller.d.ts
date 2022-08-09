import { ChangeTestDto } from './dtos/change-test.dto';
import { CreateTestDto } from './dtos/create-test.dto';
import { TestService } from './test.service';
export declare class TestController {
    private testService;
    constructor(testService: TestService);
    create(testDto: CreateTestDto): Promise<import("../../core/entities").Test>;
    findAll(): Promise<import("../../core/entities").Test[]>;
    getById(params: any): Promise<import("../../core/entities").Test[]>;
    renameTitle(params: any, answerDto: ChangeTestDto): Promise<import("../../core/entities").Test>;
    removeAll(): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    removeById(params: any): Promise<{
        message: string;
    }>;
}
