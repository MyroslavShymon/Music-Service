import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album, Performer, Song } from 'src/core/entities';
import { FileService } from 'src/core/modules/file/file.service';
import { AlbumService } from '../album/album.service';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { AlbumModule } from '../album/album.module';

@Module({
	controllers: [SongController],
	providers: [SongService, FileService],
	imports: [TypeOrmModule.forFeature([Song, Album, Performer]), AlbumModule],
	exports: [],
})
export class SongModule {}
