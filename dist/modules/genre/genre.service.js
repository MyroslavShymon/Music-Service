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
exports.GenreService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const entities_1 = require("../../core/entities");
const default_response_interface_1 = require("../../core/interfaces/default-response.interface");
const answer_service_1 = require("../answer/answer.service");
const file_service_1 = require("../../core/modules/file/file.service");
const enums_1 = require("../../core/enums");
const preferences_service_1 = require("../preferences/preferences.service");
let GenreService = class GenreService {
    constructor(fileService, answerService, preferencesService, genreRepository, answerToGenreRepository) {
        this.fileService = fileService;
        this.answerService = answerService;
        this.preferencesService = preferencesService;
        this.genreRepository = genreRepository;
        this.answerToGenreRepository = answerToGenreRepository;
    }
    async createGenre(dto, image) {
        const existedGenre = await this.genreRepository.findOne({
            where: { title: dto.title },
        });
        if (existedGenre) {
            throw new common_1.BadRequestException('Жанр вже існує');
        }
        const imagePath = image
            ? this.fileService.createFile(enums_1.FileType.IMAGE, image)
            : null;
        const genre = await this.genreRepository.save({
            title: dto.title,
            description: dto.description,
            image: imagePath,
        });
        await this.preferencesService.addPreferenceWhenGenreCreate(genre.id);
        return genre;
    }
    async createGenreToAnswerConnect(dto) {
        console.log('dto', dto);
        const answer = await this.answerService.findAnswerById(dto.answerId);
        const genre = await this.findGenreById(dto.genreId);
        return this.answerToGenreRepository.save({
            genreId: genre.id,
            answerId: answer.id,
            weight: dto.weight,
        });
    }
    async answerTheQuestion(dto) {
        const { answerId, userId } = dto;
        const answers = await this.answerToGenreRepository.find({
            where: { answerId },
        });
        try {
            for (let i = 0; i < answers.length; i++)
                await this.preferencesService.addWeight(answers[i].genreId, userId, answers[i].weight);
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
        return {
            status: common_1.HttpStatus.OK,
            message: `Відповідь дана`,
        };
    }
    async getAllGenres() {
        return this.genreRepository.find();
    }
    async findGenreById(id) {
        const genre = await this.genreRepository.findOne({ where: { id } });
        console.log('genre', id);
        if (!genre) {
            throw new common_1.NotFoundException(`Немає жанру з таким id ${id}`);
        }
        return genre;
    }
    async changeGenreById(id, dto) {
        const genre = await this.findGenreById(id);
        if (genre.title === dto.title) {
            throw new common_1.BadRequestException('Жанру має таку ж саму назву');
        }
        if (genre.description === dto.description) {
            throw new common_1.BadRequestException('Жанр має таке ж саме описання');
        }
        genre.title = dto.title;
        genre.description = dto.description;
        return this.genreRepository.save(genre);
    }
    async removeAllGenres() {
        await (0, typeorm_1.getConnection)().createQueryBuilder().delete().from(entities_1.Genre).execute();
        return {
            status: common_1.HttpStatus.OK,
            message: 'Ви видалили всі рядки',
        };
    }
    async removeGenreById(id) {
        await this.findGenreById(id);
        await this.genreRepository.delete(id);
        return {
            status: common_1.HttpStatus.OK,
            message: `Жанр з id ${id} був видалений`,
        };
    }
};
GenreService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_2.InjectRepository)(entities_1.Genre)),
    __param(4, (0, typeorm_2.InjectRepository)(entities_1.AnswerToGenre)),
    __metadata("design:paramtypes", [file_service_1.FileService,
        answer_service_1.AnswerService,
        preferences_service_1.PreferencesService,
        typeorm_1.Repository,
        typeorm_1.Repository])
], GenreService);
exports.GenreService = GenreService;
//# sourceMappingURL=genre.service.js.map