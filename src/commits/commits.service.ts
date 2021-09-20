import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { CommitData, CommitHistoryResponse } from './schema/commit.schema';

@Injectable()
export class CommitsService {
  constructor(private httpService: HttpService) {}
  private readonly GITHUB_API_URL = 'https://api.github.com/repos';

  getRepoCommits(
    username: string,
    repository: string,
  ): Observable<CommitHistoryResponse[]> {
    try {
      return this.httpService
        .get<CommitData[]>(
          `${this.GITHUB_API_URL}/${username}/${repository}/commits`,
        )
        .pipe(
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
                } as CommitHistoryResponse),
            );
          }),
        );
    } catch (error) {
      if (error.code === 404) {
        throw error; // TO DO: Error handling on not found
      }
      throw error;
    }
  }
}
