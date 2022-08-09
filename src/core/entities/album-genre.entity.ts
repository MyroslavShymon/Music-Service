import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from './album.entity';
import { Genre } from './genre.entity';

@Entity()
export class AlbumToGenre {
	@PrimaryGeneratedColumn()
	public albumToGenreId!: number;

	@Column()
	public albumId!: number;

	@Column()
	public genreId!: number;

	@ManyToOne(() => Album, (album: Album) => album.albumToGenres, {
		onDelete: 'CASCADE',
	})
	public album!: Album;

	@ManyToOne(() => Genre, (genre: Genre) => genre.albumToGenres, {
		onDelete: 'CASCADE',
	})
	public genre!: Genre;
}
