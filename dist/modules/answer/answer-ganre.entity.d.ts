import { Answer } from '.';
import { Ganre } from './ganre.entity';
export declare class AnswerToGanre {
    answerToGanreId: number;
    answerId: number;
    ganreId: number;
    weight: number;
    answer: Answer;
    ganre: Ganre;
}
