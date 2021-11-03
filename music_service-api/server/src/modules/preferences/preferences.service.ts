import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre, Preferences, User } from '../../core/entities';
import { Repository } from 'typeorm';
import { GenreService } from '../genre/genre.service';
import { UserService } from '../user/user.service';

@Injectable()
export class PreferencesService {
	constructor(
		@InjectRepository(Preferences)
		private readonly preferencesRepository: Repository<Preferences>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Genre)
		private readonly genreRepository: Repository<Genre>,
	) {}

	async addPreference(userId: number): Promise<void> {
		const genreIds = await this.genreRepository
			.createQueryBuilder('genre')
			.select(['genre.id'])
			.getMany();
		genreIds.forEach((genre: Genre) => {
			this.preferencesRepository.save({ userId, genreId: genre.id });
		});
	}

	async addPreferenceWhenGenreCreate(genreId): Promise<void> {
		const usersIds = await this.userRepository
			.createQueryBuilder('user')
			.select(['user.id'])
			.getMany();

		const preferences = await this.preferencesRepository
			.createQueryBuilder('preferences')
			.leftJoinAndSelect('preferences.genre', 'genre')
			.where('genre.id != :id', { id: genreId })
			.insert()
			.into(Preferences)
			.values([
				...usersIds.map((user) => {
					return {
						genreId,
						userId: user.id,
					};
				}),
			])
			.execute();
	}

	async addWeight(
		genreId: number,
		userId: number,
		weight = 1,
	): Promise<Preferences> {
		// try {
		// 	const preference = await this.preferencesRepository.findOne({
		// 		where: { userId, genreId },
		// 	});
		//
		// 	preference.weight += weight;
		// 	return this.preferencesRepository.save(preference);
		// } catch (e) {
		// 	throw new NotFoundException(`Не існує такого користувача або жанра ${e}`);
		// }
		const preference = await this.preferencesRepository.findOne({
			where: { userId, genreId },
		});

		if (!preference) {
			throw new NotFoundException(`Не існує такого користувача або жанра`);
		}

		preference.weight += weight;
		return this.preferencesRepository.save(preference);
	}

	async getPreferencesByUserId(id: number) {
		return this.preferencesRepository
			.createQueryBuilder('preferences')
			.leftJoin('preferences.user', 'user')
			.leftJoinAndSelect('preferences.genre', 'genre')
			.where('user.id = :id', { id })
			.getMany();
	}
}
