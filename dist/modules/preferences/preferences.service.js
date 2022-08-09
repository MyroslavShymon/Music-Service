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
exports.PreferencesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../core/entities");
const typeorm_2 = require("typeorm");
const Chance = require("chance");
let PreferencesService = class PreferencesService {
    constructor(preferencesRepository, userRepository, genreRepository, albumToGenreRepository) {
        this.preferencesRepository = preferencesRepository;
        this.userRepository = userRepository;
        this.genreRepository = genreRepository;
        this.albumToGenreRepository = albumToGenreRepository;
    }
    async addPreference(userId) {
        const genreIds = await this.genreRepository
            .createQueryBuilder('genre')
            .select(['genre.id'])
            .getMany();
        genreIds.forEach((genre) => {
            this.preferencesRepository.save({ userId, genreId: genre.id });
        });
    }
    async addPreferenceWhenGenreCreate(genreId) {
        const usersIds = await this.userRepository
            .createQueryBuilder('user')
            .select(['user.id'])
            .getMany();
        const preferences = await this.preferencesRepository
            .createQueryBuilder('preferences')
            .leftJoinAndSelect('preferences.genre', 'genre')
            .where('genre.id != :id', { id: genreId })
            .insert()
            .into(entities_1.Preferences)
            .values([
            ...usersIds.map((user) => {
                return {
                    genreId,
                    userId: user.id,
                };
            }),
        ])
            .execute();
    }
    async addWeight(genreId, userId, weight = 1) {
        const preference = await this.preferencesRepository.findOne({
            where: { userId, genreId },
        });
        if (!preference) {
            throw new common_1.NotFoundException(`Не існує такого користувача або жанра`);
        }
        preference.weight += weight;
        return this.preferencesRepository.save(preference);
    }
    async getPreferencesByUserId(id) {
        return this.preferencesRepository
            .createQueryBuilder('preferences')
            .leftJoin('preferences.user', 'user')
            .leftJoinAndSelect('preferences.genre', 'genre')
            .where('user.id = :id', { id })
            .getMany();
    }
    async getRecommendation(userId) {
        const chance = new Chance();
        const recommendation = [];
        const preferencesWeights = [];
        const preferencesGenresId = [];
        const preferences = await this.preferencesRepository.find({
            where: { userId },
        });
        preferences.forEach((prefer) => {
            preferencesWeights.push(prefer.weight);
            preferencesGenresId.push(prefer.genreId);
        });
        for (let i = 0; i < 6; i++) {
            const recommendedGenreId = chance.weighted(preferencesGenresId, preferencesWeights);
            const albumsSelectedByGenres = await this.albumToGenreRepository
                .createQueryBuilder('albumToGenreRepository')
                .leftJoinAndSelect('albumToGenreRepository.album', 'album')
                .leftJoin('albumToGenreRepository.genre', 'genre')
                .setParameters({ genreId: recommendedGenreId })
                .where('genre.id = :genreId')
                .getMany();
            const albums = albumsSelectedByGenres.map((album) => album.album);
            if (albums.length)
                recommendation.push(chance.pickone(albums));
        }
        return recommendation;
    }
};
PreferencesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Preferences)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.Genre)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.AlbumToGenre)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PreferencesService);
exports.PreferencesService = PreferencesService;
//# sourceMappingURL=preferences.service.js.map