import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiColumnsService } from '../api/services/api-colomns.service';
import { map, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { IColumn, ITask, IUpdateColumnReq, IUpdateTaskReq } from '../api/models/api-board.model';
import { LoaderService } from '../shared/components/loader/loader.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskPopupComponent } from '../shared/components/create-task-popup/create-task-popup.component';
import { ColumnsService } from './columns.service';
import { ApiBoardService } from '../api/services/api-board.service';
import { ApiTasksService } from '../api/services/api-tasks.service';

@Component({
  selector: 'app-columns-page',
  templateUrl: './columns-page.component.html',
  styleUrls: ['./columns-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnsPageComponent implements OnInit {
  public addColumn = false;

  public newColumnForm = new FormGroup({ columnName: new FormControl('', Validators.required) });

  public board$ = this.columnsService.board$;

  public columns$ = this.board$.pipe(map((board) => board.columns));

  private readonly currBoardId = this.columnsService.currBoardId;

  public connectedLists: string[] = [];

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly loaderService: LoaderService,
    private readonly elRef: ElementRef,
    private readonly dialogRef: MatDialog,
    private readonly columnsService: ColumnsService,
    private readonly apiColumnsService: ApiColumnsService,
    private readonly apiBoardService: ApiBoardService,
    private readonly apiTasksService: ApiTasksService
  ) {}

  ngOnInit() {
    this.loaderService.enableLoader();
    this.apiBoardService
      .getBoard(this.currBoardId)
      .pipe(
        tap((board) => {
          for (let column of board.columns) {
            this.connectedLists.push(column.id);
          }
          this.columnsService.board$.next(board);
          console.log(this.connectedLists);
        })
      )
      .subscribe(() => this.loaderService.disableLoader());
  }

  onAddColumn() {
    this.addColumn = true;
    this.elRef.nativeElement.scroll(9999, 0);
  }

  onCancelAddColumn() {
    this.addColumn = false;
  }

  onCreateColumn() {
    this.loaderService.enableLoader();
    const title = this.newColumnForm.controls.columnName.value!;
    this.apiColumnsService
      .createNewColumn(this.currBoardId, title)
      .pipe(
        tap((resp) => this.connectedLists.push(resp.id)),
        switchMap(() => this.apiBoardService.getBoard(this.currBoardId)),
        tap((board) => {
          this.columnsService.board$.next(board);
          console.log(this.columnsService.board$.value);
        })
      )
      .subscribe(() => this.loaderService.disableLoader());
  }

  onDeleteColumn(columnId: string) {
    this.loaderService.enableLoader();
    this.connectedLists = this.connectedLists.filter((id) => id !== columnId);
    this.apiColumnsService.deleteColumn(this.currBoardId, columnId).subscribe();
    this.apiBoardService
      .getBoard(this.currBoardId)
      .pipe(
        tap((board) => {
          this.columnsService.board$.next(board);
        })
      )
      .subscribe(() => this.loaderService.disableLoader());
  }

  dropColumn(event: CdkDragDrop<IColumn[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    const columns = event.container.data;
    const movedColumn = columns[event.currentIndex];
    const body: IUpdateColumnReq = {
      title: movedColumn.title,
      order: event.currentIndex + 1,
    };
    this.apiColumnsService.updateColumn(this.currBoardId, movedColumn.id, body).subscribe();
  }

  dropTask(event: CdkDragDrop<ITask[]>, columnId: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const tasks = event.container.data;
      const movedTask = tasks[event.currentIndex];

      const body: IUpdateTaskReq = {
        title: movedTask.title,
        order: event.currentIndex + 1,
        description: movedTask.description,
        userId: movedTask.userId,
        boardId: this.currBoardId,
        columnId: columnId,
      };
      this.apiTasksService.updateTask(movedTask.id, body).subscribe();
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      const tasks = event.container.data;
      const movedTask = tasks[event.currentIndex];
      const prevColumnId = event.previousContainer.id;
      const currColumnId = event.container.id;

      const body: IUpdateTaskReq = {
        title: movedTask.title,
        order: event.currentIndex + 1,
        description: movedTask.description,
        userId: movedTask.userId,
        boardId: this.currBoardId,
        columnId: currColumnId,
      };
      this.apiTasksService.updateTransferredTask(prevColumnId, movedTask.id, body).subscribe();
    }
  }

  createTaskPopup(columnId: string) {
    this.dialogRef.open(CreateTaskPopupComponent, { data: columnId, width: '350px' });
  }
}
