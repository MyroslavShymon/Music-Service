import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AnswerToTest } from './answer-test.entity';

@Entity()
export class Test {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ unique: true, type: 'varchar', length: 200, nullable: false })
	public title: string;

	// @ManyToMany(() => Answer, (answer: Answer) => answer.tests)
	// public answers: Promise<Answer[]>;

	@OneToMany(() => AnswerToTest, (answerToTest) => answerToTest.test, {
		onDelete: 'CASCADE',
	})
	public answerToTests!: AnswerToTest[];
}
