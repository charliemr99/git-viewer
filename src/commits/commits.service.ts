import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { CommitData, CommitHistoryResponse } from './schema/commit.schema';

@Injectable()
export class CommitsService {
  constructor(private httpService: HttpService) {}
  private readonly GITHUB_API_URL = 'https://api.github.com/repos';

  getRepoCommits(
    username: string,
    repository: string,
  ): Observable<CommitHistoryResponse[]> {
    return this.httpService
      .get<CommitData[]>(
        `${this.GITHUB_API_URL}/${username}/${repository}/commits`,
      )
      .pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
        map((rawData) => rawData.data),
        map((unformattedData) => {
          return unformattedData.map(
            (commitData) =>
              ({
                id: commitData.node_id,
                message: commitData.commit.message,
                author: commitData.commit.author.name,
                avatarSrc: commitData.author.avatar_url,
                date: new Date(commitData.commit.author.date),
                sha: commitData.sha,
              } as CommitHistoryResponse),
          );
        }),
      );
  }
}
