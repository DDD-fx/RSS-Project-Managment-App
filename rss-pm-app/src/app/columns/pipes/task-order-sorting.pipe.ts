import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../../api/models/api-board.model';

@Pipe({
  name: 'taskOrderSorting',
})
export class TaskOrderSortingPipe implements PipeTransform {
  transform(dataArr: ITask[]): ITask[] {
    return dataArr.sort((a, b) => a.order - b.order);
  }
}
