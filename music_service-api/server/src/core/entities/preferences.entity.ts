import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Genre } from './genre.entity';
import { User } from './user.entity';

@Entity()
export class Preferences {
	@PrimaryGeneratedColumn()
	public userToGenreId!: number;

	@Column()
	public userId!: number;

	@Column()
	public genreId!: number;

	@Column({ type: 'integer', default: 0, unsigned: true })
	public weight!: number;

	@ManyToOne(() => User, (user: User) => user.preferences, {
		onDelete: 'CASCADE',
		cascade: true,
	})
	public user!: User;

	@ManyToOne(() => Genre, (genre: Genre) => genre.preferences, {
		onDelete: 'CASCADE',
		cascade: true,
	})
	public genre!: Genre;
}
