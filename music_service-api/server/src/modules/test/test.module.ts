import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from 'src/core/entities';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
	controllers: [TestController],
	providers: [TestService],
	imports: [TypeOrmModule.forFeature([Test])],
	exports: [TestService],
})
export class TestModule {}
