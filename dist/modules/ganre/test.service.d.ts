import { HttpStatus } from '@nestjs/common';
import { Test } from 'src/core/entities';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dtos/create-test.dto';
export declare class TestService {
    private readonly testRepository;
    constructor(testRepository: Repository<Test>);
    createTest(dto: CreateTestDto): Promise<Test>;
    findAllTests(): Promise<Test[]>;
    findTestById(id: number): Promise<Test[]>;
    changeTestTitleById(id: number, title: string): Promise<Test>;
    removeAllTests(): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    removeTestById(id: number): Promise<{
        message: string;
    }>;
}
