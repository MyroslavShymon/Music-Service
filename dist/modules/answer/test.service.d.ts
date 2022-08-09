import { Test } from 'src/core/entities';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dtos/create-test.dto';
export declare class TestService {
    private readonly testRepository;
    constructor(testRepository: Repository<Test>);
    createTest(dto: CreateTestDto): Promise<Test>;
}
