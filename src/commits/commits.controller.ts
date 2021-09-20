import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetRepoCommits } from './endpoint-decorator';
import { CommitData } from './schema/commit.schema';

@Controller('commits')
@ApiTags('Github Commits')
export class CommitsController {
  constructor(private readonly commitsService: CommitsService) {}

  @GetRepoCommits()
  async getRepoCommits(): Promise<CommitData[]> {
    return await this.commitsService.getDishes();
  }
}
