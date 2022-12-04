import { Pipe, PipeTransform } from '@angular/core';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(boards: ICreateBoardResp[] | null | undefined, args: string): ICreateBoardResp[] | null | undefined {
    if (!boards || boards.length === 0) {
      return boards;
    }

    const data = [...boards];

    return data.sort((a, b) => {
      if (args === 'asc') {
        return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
      } else {
        return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1;
      }
    });
  }
}
