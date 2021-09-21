import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class RepositoryNotFound extends Error {}

@Injectable()
export class GetRepositoryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof RepositoryNotFound) {
          console.error('error: ', error);
          return throwError(() => new NotFoundException());
        } else {
          return throwError(() => error);
        }
      }),
    );
  }
}
