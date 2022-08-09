import { CreateTestDto } from './dtos/create-test.dto';
import { TestService } from './test.service';
export declare class TestController {
    private testService;
    constructor(testService: TestService);
    create(testDto: CreateTestDto): Promise<import("../../core/entities").Test>;
}
