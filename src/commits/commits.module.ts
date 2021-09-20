import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CommitsController } from './commits.controller';

@Module({
  imports: [HttpModule],
  controllers: [CommitsController],
})
export class DishesModule {}
