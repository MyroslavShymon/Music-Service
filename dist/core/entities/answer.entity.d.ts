import { AnswerToGenre } from './answer-genre.entity';
import { AnswerToTest } from './answer-test.entity';
export declare class Answer {
    id: number;
    title: string;
    answerToGenres: AnswerToGenre[];
    answerToTests: AnswerToTest[];
}
