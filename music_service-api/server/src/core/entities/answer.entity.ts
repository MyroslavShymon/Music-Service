import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AnswerToGenre } from './answer-genre.entity';
import { AnswerToTest } from './answer-test.entity';

@Entity()
export class Answer {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ type: 'varchar', length: 200, unique: true, nullable: false })
	public title: string;

	// @ManyToMany(() => Test, { cascade: true })
	// @JoinTable({
	//   name: 'answers_tests',
	//   joinColumn: { name: 'answerId', referencedColumnName: 'id' },
	//   inverseJoinColumn: { name: 'testId' },
	// })
	// public tests: Test[];

	@OneToMany(() => AnswerToGenre, (answerToGenre) => answerToGenre.answer, {
		onDelete: 'CASCADE',
	})
	public answerToGenres!: AnswerToGenre[];

	@OneToMany(() => AnswerToTest, (answerToTest) => answerToTest.answer, {
		onDelete: 'CASCADE',
	})
	public answerToTests!: AnswerToTest[];
}
