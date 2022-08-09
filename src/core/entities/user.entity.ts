import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	ManyToMany,
	AfterInsert,
	Repository,
} from 'typeorm';
import { Preferences } from './preferences.entity';
import { Role } from './role.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ type: 'varchar', length: 100, nullable: false })
	public email: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	public name: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	public password: string;

	@Column({ type: 'varchar', length: 150, nullable: true })
	public image?: string;

	@OneToMany(() => Preferences, (preference: Preferences) => preference.user, {
		onDelete: 'CASCADE',
	})
	public preferences!: Preferences[];

	@ManyToMany(() => Role, (role: Role) => role.users, { onDelete: 'CASCADE' })
	public roles: Role[];
}
