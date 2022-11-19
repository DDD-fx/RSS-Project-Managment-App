import { Pipe, PipeTransform } from '@angular/core';
import { IColumn } from '../../api/models/api-board.model';

@Pipe({
  name: 'columnOrderSorting',
})
export class ColumnOrderSortingPipe implements PipeTransform {
  transform(dataArr: IColumn[]): IColumn[] {
    return dataArr.sort((a, b) => a.order - b.order);
  }
}
