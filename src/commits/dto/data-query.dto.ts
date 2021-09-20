import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DataQueryDto {
  @IsString()
  username: string;

  @IsString()
  repository: string;
}
