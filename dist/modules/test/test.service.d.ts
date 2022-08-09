import { Repository } from 'typeorm';
import { Test } from 'src/core/entities';
import { IDefaultSuccessResponse } from 'src/core/interfaces/default-response.interface';
import { CreateTestDto } from './dtos/create-test.dto';
export declare class TestService {
    private readonly testRepository;
    constructor(testRepository: Repository<Test>);
    createTest(dto: CreateTestDto): Promise<Test>;
    getAllTests(): Promise<Test[]>;
    findTestById(id: number): Promise<Test>;
    changeTestTitleById(id: number, title: string): Promise<Test>;
    removeAllTests(): Promise<IDefaultSuccessResponse>;
    removeTestById(id: number): Promise<IDefaultSuccessResponse>;
}
