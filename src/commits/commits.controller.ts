import { Controller, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { CommitsService } from './commits.service';
import { DataQueryDto } from './dto/data-query.dto';
import { GetRepoCommits } from './endpoint-decorator';
import { CommitHistoryResponse } from './schema/commit.schema';

@Controller('commits')
@ApiTags('Github Commits')
export class CommitsController {
  constructor(private readonly commitsService: CommitsService) {}

  @GetRepoCommits()
  async getRepoCommits(
    @Query() dataQueryDto: DataQueryDto,
  ): Promise<CommitHistoryResponse[]> {
    const commitHistoryObservable = this.commitsService.getRepoCommits(
      dataQueryDto.username,
      dataQueryDto.repository,
    );

    const response = await lastValueFrom(commitHistoryObservable);
    return response;
  }
}
