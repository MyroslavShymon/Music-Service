import {IGenre} from "./Genre.interface.response";

export interface IPreferences {
    userId: number,
    genreId: number,
    weight: number,
    genre: IGenre
}