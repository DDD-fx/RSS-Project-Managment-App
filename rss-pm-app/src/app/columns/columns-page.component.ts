import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiColumnsService } from '../api/services/api-colomns.service';
import { map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { IColumn, IGetBoardResp, ITask, IUpdateColumnReq, IUpdateTaskReq } from '../api/models/api-board.model';
import { LoaderService } from '../shared/components/loader/loader.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskPopupComponent } from '../shared/components/create-task-popup/create-task-popup.component';
import { ColumnsService } from './columns.service';
import { ApiBoardService } from '../api/services/api-board.service';
import { ApiTasksService } from '../api/services/api-tasks.service';
import { DeletingPopupComponent } from '../shared/components/deleting-popup/deleting-popup.component';
import { CreateColumnPopupComponent } from '../shared/components/create-column-popup/create-column-popup.component';

@Component({
  selector: 'app-columns-page',
  templateUrl: './columns-page.component.html',
  styleUrls: ['./columns-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnsPageComponent implements OnInit {
  public board$ = this.columnsService.board$;

  public columns$ = this.board$.pipe(map((board) => board.columns));

  private readonly currBoardId$ = this.columnsService.currBoardId$;

  public connectedLists$ = this.columnsService.connectedLists$;

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
    this.columnsService.updatedBoard({} as IGetBoardResp);
    this.columnsService.getBoardId(this.router.url.split('/').pop()!);
    this.apiBoardService
      .getBoard(this.currBoardId$.value)
      .pipe(
        tap((board) => {
          const connectedLists = [];
          for (let column of board.columns) {
            connectedLists.push(column.id);
          }
          this.columnsService.updateConnectedLists(connectedLists);
          this.columnsService.updatedBoard(board);
        })
      )
      .subscribe();
  }

  onDeleteColumn(columnId: string) {
    let connectedLists = this.connectedLists$.value;
    connectedLists = connectedLists.filter((id) => id !== columnId);
    this.columnsService.updateConnectedLists(connectedLists);

    let dialog = this.dialogRef.open(DeletingPopupComponent, { data: { name: 'deleting-popup.del-column' } });
    dialog.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.loaderService.enableLoader();
        this.apiColumnsService.deleteColumn(this.currBoardId$.value, columnId).subscribe();
        this.apiBoardService
          .getBoard(this.currBoardId$.value)
          .pipe(
            tap((board) => {
              this.columnsService.updatedBoard(board);
            })
          )
          .subscribe(() => this.loaderService.disableLoader());
      }
    });
  }

  dropColumn(event: CdkDragDrop<IColumn[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    const columns = event.container.data;
    const movedColumn = columns[event.currentIndex];
    const body: IUpdateColumnReq = {
      title: movedColumn.title,
      order: event.currentIndex + 1,
    };
    this.apiColumnsService.updateColumn(this.currBoardId$.value, movedColumn.id, body).subscribe();
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
        boardId: this.currBoardId$.value,
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
        boardId: this.currBoardId$.value,
        columnId: currColumnId,
      };
      this.apiTasksService.updateTransferredTask(prevColumnId, movedTask.id, body).subscribe();
    }
  }

  createColumnPopup() {
    this.elRef.nativeElement.scroll(9999, 0);
    this.dialogRef.open(CreateColumnPopupComponent);
  }

  createTaskPopup(columnId: string) {
    this.dialogRef.open(CreateTaskPopupComponent, { data: columnId, width: '350px' });
  }
}
