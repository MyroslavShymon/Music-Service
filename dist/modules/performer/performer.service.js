"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const entities_1 = require("../../core/entities");
const default_response_interface_1 = require("../../core/interfaces/default-response.interface");
const file_service_1 = require("../../core/modules/file/file.service");
const enums_1 = require("../../core/enums");
let PerformerService = class PerformerService {
    constructor(fileService, performerRepository) {
        this.fileService = fileService;
        this.performerRepository = performerRepository;
    }
    async createPerformer(dto, image) {
        const existedPerformer = await this.performerRepository.findOne({
            where: { title: dto.title },
        });
        if (existedPerformer) {
            throw new common_1.BadRequestException('Виконавець з таким іменем вже існує');
        }
        const imagePath = image
            ? this.fileService.createFile(enums_1.FileType.IMAGE, image)
            : null;
        return this.performerRepository.save({
            title: dto.title,
            description: dto.description,
            image: imagePath,
        });
    }
    async removeAllPerformers() {
        await (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .delete()
            .from(entities_1.Performer)
            .execute();
        return {
            status: common_1.HttpStatus.OK,
            message: 'Ви видалили всі рядки',
        };
    }
    async removePerformerById(id) {
        await this.findPerformerById(id);
        await this.performerRepository.delete(id);
        return {
            status: common_1.HttpStatus.OK,
            message: `Виконавець з id ${id} була видалена`,
        };
    }
    async findPerformerById(id) {
        const performer = await this.performerRepository.findOne({
            where: { id },
        });
        if (!performer) {
            throw new common_1.NotFoundException(`Немає виконавця з таким id ${id}`);
        }
        return performer;
    }
    async getAllPerformers() {
        return this.performerRepository.find();
    }
    async changePerformerById(id, dto) {
        const performer = await this.findPerformerById(id);
        if (performer.title === dto.title) {
            throw new common_1.BadRequestException('Ви хочете змінити назву виконавця на ту ж саму');
        }
        if (performer.description === dto.description) {
            throw new common_1.BadRequestException('Ви хочете змінити опис виконавця на ту ж саму');
        }
        performer.title = dto.title;
        performer.description = dto.description;
        return this.performerRepository.save(performer);
    }
};
PerformerService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(entities_1.Performer)),
    __metadata("design:paramtypes", [file_service_1.FileService,
        typeorm_1.Repository])
], PerformerService);
exports.PerformerService = PerformerService;
//# sourceMappingURL=performer.service.js.map