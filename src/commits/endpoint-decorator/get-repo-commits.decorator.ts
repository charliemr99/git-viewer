import { applyDecorators, Get } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiQuery,
} from '@nestjs/swagger';

export function GetRepoCommits() {
  const usernameQueryDescription = `**Github Username.**`;
  const repositoryQueryDescription = `**Github Repository.**
  <details>
<summary>Requirements</summary>
- The repository must be public.
</details>`;
  const conflictResponseDescription = `**The provided date is already registered.**`;
  const forbiddenResponseDescription = `**The requester user is disabled.**`;

  return applyDecorators(
    // ? BEHAVIOR
    Get(),

    // ? DOCS
    ApiQuery({
      name: 'username',
      type: String,
      required: true,
      description: usernameQueryDescription,
      example: 'charliemr99',
    }),
    ApiQuery({
      name: 'repository',
      type: String,
      required: true,
      description: repositoryQueryDescription,
      example: 'git-viewer',
    }),
    ApiConflictResponse({
      description: conflictResponseDescription,
    }),
    ApiForbiddenResponse({
      description: forbiddenResponseDescription,
    }),
  );
}
