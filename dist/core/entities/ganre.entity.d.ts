import { Album } from './album.entity';
import { AnswerToGenre } from './answer-genre.entity';
import { Preferences } from './preferences.entity';
export declare class Genre {
    id: number;
    title: string;
    description: string;
    image: string;
    answerToGenres: AnswerToGenre[];
    preferences: Preferences[];
    albums: Album[];
}
