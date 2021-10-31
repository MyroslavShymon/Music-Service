import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Answer } from '.';
import { Genre } from './genre.entity';

@Entity()
export class AnswerToGenre {
	@PrimaryGeneratedColumn()
	public answerToGenreId!: number;

	@Column()
	public answerId!: number;

	@Column()
	public genreId!: number;

	@Column({ type: 'integer', default: 0, unsigned: true, scale: 10 })
	public weight!: number;

	@ManyToOne(() => Answer, (answer: Answer) => answer.answerToGenres, {
		onDelete: 'CASCADE',
	})
	public answer!: Answer;

	@ManyToOne(() => Genre, (genre: Genre) => genre.answerToGenres, {
		onDelete: 'CASCADE',
	})
	public genre!: Genre;
}
