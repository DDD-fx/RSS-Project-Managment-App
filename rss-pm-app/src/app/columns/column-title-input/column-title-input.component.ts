import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IColumn, IUpdateColumnReq } from '../../api/models/api-board.model';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiColumnsService } from '../../api/services/api-colomns.service';
import { ColumnsService } from '../columns.service';

@Component({
  selector: 'app-column-title-input',
  templateUrl: './column-title-input.component.html',
  styleUrls: ['./column-title-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnTitleInputComponent {
  @Input() column = {} as IColumn;

  public showColumnTitle$ = new BehaviorSubject(true);

  public newTitleForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  constructor(private readonly apiColumnsService: ApiColumnsService, private readonly columnsService: ColumnsService) {}

  @ViewChild('columnTitleInput', { static: false })
  set input(element: ElementRef<HTMLInputElement>) {
    if (element) {
      this.newTitleForm.setValue({ title: this.column.title });
      element.nativeElement.focus();
    }
  }

  toggleColumnTitleInput(): void {
    this.showColumnTitle$.next(!this.showColumnTitle$.value);
  }

  updateColumnTitle(): void {
    this.toggleColumnTitleInput();
    const newColumnTitle = this.newTitleForm.get('title')?.value;
    if (newColumnTitle !== this.column.title) {
      this.column.title = newColumnTitle;
      const body: IUpdateColumnReq = {
        title: newColumnTitle,
        order: this.column.order,
      };
      this.apiColumnsService.updateColumn(this.columnsService.currBoardId$.value, this.column.id, body).subscribe();
    }
  }
}
