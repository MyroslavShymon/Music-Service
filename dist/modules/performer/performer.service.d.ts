/// <reference types="multer" />
import { Repository } from 'typeorm';
import { Performer } from 'src/core/entities';
import { CreatePerformerDto } from './dtos/create-performer.dto';
import { IDefaultSuccessResponse } from 'src/core/interfaces/default-response.interface';
import { ChangePerformerDto } from './dtos/change-performer.dto';
import { FileService } from 'src/core/modules/file/file.service';
export declare class PerformerService {
    private fileService;
    private readonly performerRepository;
    constructor(fileService: FileService, performerRepository: Repository<Performer>);
    createPerformer(dto: CreatePerformerDto, image: Express.Multer.File): Promise<Performer>;
    removeAllPerformers(): Promise<IDefaultSuccessResponse>;
    removePerformerById(id: number): Promise<IDefaultSuccessResponse>;
    findPerformerById(id: number): Promise<Performer>;
    getAllPerformers(): Promise<Performer[]>;
    changePerformerById(id: number, dto: ChangePerformerDto): Promise<Performer>;
}
