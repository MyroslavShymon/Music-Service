import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToMany,
	OneToMany,
} from 'typeorm';
import { Album } from './album.entity';
import { AnswerToGenre } from './answer-genre.entity';
import { Preferences } from './preferences.entity';
import { AlbumToGenre } from './album-genre.entity';

@Entity()
export class Genre {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ unique: true, type: 'varchar', length: 200, nullable: false })
	public title: string;

	@Column({ unique: true, type: 'text' })
	public description: string;

	@Column({ type: 'varchar', length: 150, nullable: true })
	public image: string;

	@OneToMany(() => AnswerToGenre, (answerToGenre) => answerToGenre.genre, {
		onDelete: 'CASCADE',
	})
	public answerToGenres!: AnswerToGenre[];

	@OneToMany(() => AlbumToGenre, (albumToGenre) => albumToGenre.genre, {
		onDelete: 'CASCADE',
	})
	public albumToGenres!: AlbumToGenre[];

	@OneToMany(() => Preferences, (preference: Preferences) => preference.genre, {
		onDelete: 'CASCADE',
	})
	public preferences!: Preferences[];

	@ManyToMany(() => Album, (album: Album) => album.genres)
	public albums: Album[];
}
