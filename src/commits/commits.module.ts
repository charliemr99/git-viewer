import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CommitsController } from './commits.controller';
import { CommitsService } from './commits.service';

@Module({
  imports: [HttpModule],
  controllers: [CommitsController],
  providers: [CommitsService],
})
export class CommitsModule {}
