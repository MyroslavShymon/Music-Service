import { Answer } from '.';
import { Genre } from './genre.entity';
export declare class AnswerToGenre {
    answerToGenreId: number;
    answerId: number;
    genreId: number;
    weight: number;
    answer: Answer;
    genre: Genre;
}
