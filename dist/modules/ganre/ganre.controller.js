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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const change_genre_dto_1 = require("./dtos/change-genre.dto");
const create_genre_answer_dto_1 = require("./dtos/create-genre-answer.dto");
const create_genre_dto_1 = require("./dtos/create-genre.dto");
const genre_service_1 = require("./genre.service");
let GenreController = class GenreController {
    constructor(genreService) {
        this.genreService = genreService;
    }
    create(genreDto, image) {
        return this.genreService.createGenre(genreDto, image);
    }
    createAnswerConnect(genreAnswerDto) {
        return this.genreService.createGenreToAnswerConnect(genreAnswerDto);
    }
    getAll() {
        return this.genreService.getAllGenres();
    }
    getById(params) {
        return this.genreService.findGenreById(params.id);
    }
    changeGenre(params, genreDto) {
        return this.genreService.changeGenreById(params.id, genreDto);
    }
    removeAll() {
        return this.genreService.removeAllGenres();
    }
    removeById(params) {
        return this.genreService.removeGenreById(params.id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_genre_dto_1.CreateGenreDto !== "undefined" && create_genre_dto_1.CreateGenreDto) === "function" ? _a : Object, Object]),
    __metadata("design:returntype", void 0)
], GenreController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/connect'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_genre_answer_dto_1.createGenreAnswerConnectionDto !== "undefined" && create_genre_answer_dto_1.createGenreAnswerConnectionDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], GenreController.prototype, "createAnswerConnect", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GenreController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GenreController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof change_genre_dto_1.ChangeGenreDto !== "undefined" && change_genre_dto_1.ChangeGenreDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], GenreController.prototype, "changeGenre", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GenreController.prototype, "removeAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GenreController.prototype, "removeById", null);
GenreController = __decorate([
    (0, common_1.Controller)('/genre'),
    __metadata("design:paramtypes", [typeof (_d = typeof genre_service_1.GenreService !== "undefined" && genre_service_1.GenreService) === "function" ? _d : Object])
], GenreController);
exports.GenreController = GenreController;
//# sourceMappingURL=ganre.controller.js.map