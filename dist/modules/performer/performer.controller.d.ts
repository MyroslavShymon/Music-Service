/// <reference types="multer" />
import { ChangePerformerDto } from './dtos/change-performer.dto';
import { CreatePerformerDto } from './dtos/create-performer.dto';
import { PerformerService } from './performer.service';
export declare class PerformerController {
    private performerService;
    constructor(performerService: PerformerService);
    create(performerDto: CreatePerformerDto, image: Express.Multer.File): Promise<import("../../core/entities").Performer>;
    getAll(): Promise<import("../../core/entities").Performer[]>;
    getById(params: any): Promise<import("../../core/entities").Performer>;
    changePerformer(params: any, performerDto: ChangePerformerDto): Promise<import("../../core/entities").Performer>;
    removeAll(): Promise<import("../../core/interfaces/default-response.interface").IDefaultSuccessResponse>;
    removeById(params: any): Promise<import("../../core/interfaces/default-response.interface").IDefaultSuccessResponse>;
}
