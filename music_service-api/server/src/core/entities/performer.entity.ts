import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Album } from '.';

@Entity()
export class Performer {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ type: 'varchar', length: 100, unique: true, nullable: false })
	public title: string;

	@Column({ type: 'varchar', length: 150, nullable: false })
	public image: string;

	@Column({ type: 'text', default: '' })
	public description: string;

	@OneToMany(() => Album, (album) => album.performer)
	public albums: Album[];
}
