import { Pipe, PipeTransform } from '@angular/core';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(data: ICreateBoardResp[] | [] | null, args: string): ICreateBoardResp[] | [] | null {
    // const sortDirection = args;
    // let multiplier = 1;

    // if (sortDirection === 'desc') {
    //   multiplier = -1;
    // }

    if (!data || data.length === 0) {
      return data;
    }

    // data.sort((a, b) => {
    //   if (a.title.toLowerCase() < b.title.toLowerCase()) {
    //     return -1 * multiplier;
    //   }
    //   if (a.title.toLowerCase() > b.title.toLowerCase()) {
    //     return 1 * multiplier;
    //   }
    //   return 0;
    // });
    return data.sort((a, b) => {
      if (args === 'asc') {
        return a.title > b.title ? 1 : -1;
      } else {
        return a.title > b.title ? -1 : 1;
      }
    });
  }
}
