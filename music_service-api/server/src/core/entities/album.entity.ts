import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToMany,
	OneToMany,
	ManyToOne,
	JoinTable,
} from 'typeorm';
import { Performer } from './performer.entity';
import { Song } from './song.entity';
import { Genre } from './genre.entity';
import { AlbumToGenre } from './album-genre.entity';

@Entity()
export class Album {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ unique: true, type: 'varchar', length: 200, nullable: false })
	public title: string;

	@Column({ type: 'integer' })
	public year: number;

	@Column({ type: 'varchar', length: 150, nullable: false })
	public image: string;

	@OneToMany(() => Song, (song) => song.album)
	public songs: Song[];

	@ManyToOne(() => Performer, (performer: Performer) => performer.albums, {
		nullable: false,
		onDelete: 'CASCADE',
	})
	public performer: Performer;

	@OneToMany(() => AlbumToGenre, (albumToGenre) => albumToGenre.album, {
		onDelete: 'CASCADE',
	})
	public albumToGenres!: AlbumToGenre[];

	@ManyToMany(() => Genre, (genre: Genre) => genre.albums, { cascade: true })
	@JoinTable({
		name: 'albums_genres',
		joinColumn: { name: 'genreId', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'albumId' },
	})
	public genres: Genre[];
}
