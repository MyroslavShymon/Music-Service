import { Genre } from './genre.entity';
import { User } from './user.entity';
export declare class Preferences {
    userToGenreId: number;
    userId: number;
    genreId: number;
    weight: number;
    user: User;
    genre: Genre;
}
