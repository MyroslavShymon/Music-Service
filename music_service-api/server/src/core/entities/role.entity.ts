import {
	Column,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
	JoinTable,
} from 'typeorm';
import { User } from '.';

@Entity()
export class Role {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ type: 'varchar', length: 200, nullable: false })
	public title: string;

	@Column({ type: 'text' })
	public description: string;

	@ManyToMany(() => User, (user: User) => user.roles, { cascade: true })
	@JoinTable({
		name: 'roles_users',
		joinColumn: { name: 'roleId', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'userId' },
	})
	public users: User[];
}
