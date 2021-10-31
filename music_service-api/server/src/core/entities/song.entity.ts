import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Album } from '.';

@Entity()
export class Song {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column({ type: 'varchar', length: 100, nullable: false })
	public title: string;

	@Column({ type: 'text', default: '' })
	public text: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	public audio: string;

	@Column({ type: 'integer', default: 0 })
	public plays: number;

	@Column({ default: 1 })
	public disc: number;

	@ManyToOne(() => Album, (album: Album) => album.songs, {
		onDelete: 'CASCADE',
	})
	public album: Album;
}
