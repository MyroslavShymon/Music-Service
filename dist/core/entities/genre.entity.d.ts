import { Album } from './album.entity';
import { AnswerToGenre } from './answer-genre.entity';
import { Preferences } from './preferences.entity';
import { AlbumToGenre } from './album-genre.entity';
export declare class Genre {
    id: number;
    title: string;
    description: string;
    image: string;
    answerToGenres: AnswerToGenre[];
    albumToGenres: AlbumToGenre[];
    preferences: Preferences[];
    albums: Album[];
}
