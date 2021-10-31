import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformerController } from './performer.controller';
import { PerformerService } from './performer.service';
import { Performer } from 'src/core/entities';
import { FileService } from 'src/core/modules/file/file.service';

@Module({
	controllers: [PerformerController],
	providers: [PerformerService, FileService],
	imports: [TypeOrmModule.forFeature([Performer])],
	exports: [PerformerService],
})
export class PerformerModule {}
