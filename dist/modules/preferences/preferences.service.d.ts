import { AlbumToGenre, Genre, Preferences, User } from '../../core/entities';
import { Repository } from 'typeorm';
export declare class PreferencesService {
    private readonly preferencesRepository;
    private readonly userRepository;
    private readonly genreRepository;
    private readonly albumToGenreRepository;
    constructor(preferencesRepository: Repository<Preferences>, userRepository: Repository<User>, genreRepository: Repository<Genre>, albumToGenreRepository: Repository<AlbumToGenre>);
    addPreference(userId: number): Promise<void>;
    addPreferenceWhenGenreCreate(genreId: any): Promise<void>;
    addWeight(genreId: number, userId: number, weight?: number): Promise<Preferences>;
    getPreferencesByUserId(id: number): Promise<Preferences[]>;
    getRecommendation(userId: number): Promise<any[]>;
}
