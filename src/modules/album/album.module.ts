import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album, AlbumToGenre, Performer } from 'src/core/entities';
import { FileService } from 'src/core/modules/file/file.service';
import { PerformerService } from '../performer/performer.service';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { GenreModule } from '../genre/genre.module';

@Module({
	controllers: [AlbumController],
	providers: [AlbumService, PerformerService, FileService],
	imports: [
		TypeOrmModule.forFeature([Album, Performer, AlbumToGenre]),
		GenreModule,
	],
	exports: [AlbumService],
})
export class AlbumModule {}
