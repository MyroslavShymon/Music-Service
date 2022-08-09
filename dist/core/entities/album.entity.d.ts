import { Performer } from './performer.entity';
import { Song } from './song.entity';
import { Genre } from './genre.entity';
import { AlbumToGenre } from './album-genre.entity';
export declare class Album {
    id: number;
    title: string;
    year: number;
    image: string;
    songs: Song[];
    performer: Performer;
    albumToGenres: AlbumToGenre[];
    genres: Genre[];
}
