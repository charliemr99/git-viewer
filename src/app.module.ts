import { Module } from '@nestjs/common';
import { CommitsModule } from './commits/commits.module';

@Module({
  imports: [CommitsModule],
})
export class AppModule {}
