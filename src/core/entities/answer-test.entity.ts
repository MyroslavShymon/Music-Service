import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Answer, Test } from '.';

@Entity()
export class AnswerToTest {
	@PrimaryGeneratedColumn()
	public answerToTestId!: number;

	@Column()
	public answerId!: number;

	@Column()
	public testId!: number;

	@Column({ nullable: true })
	public nextTestId!: number;

	@ManyToOne(() => Answer, (answer: Answer) => answer.answerToTests, {
		onDelete: 'CASCADE',
	})
	public answer!: Answer;

	@ManyToOne(() => Test, (genre: Test) => genre.answerToTests, {
		onDelete: 'CASCADE',
	})
	public test!: Test;
}
