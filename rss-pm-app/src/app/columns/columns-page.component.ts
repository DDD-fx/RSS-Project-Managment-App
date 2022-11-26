import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiColumnsService } from '../api/services/api-colomns.service';
import { catchError, map, switchMap, tap } from 'rxjs';
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
import { IHttpErrors } from '../api/models/errors.model';
import { ESiteUrls } from '../shared/shared.enums';
import { NotificationService } from '../api/notification.service';

@Component({
  selector: 'app-columns-page',
  templateUrl: './columns-page.component.html',
  styleUrls: ['./columns-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnsPageComponent implements OnInit {
  // public board$ = this.columnsService.board$;
  public isNotDataColumns = true;

  public columns$ = this.columnsService.board$.pipe(map((board) => board.columns));

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
    private readonly apiTasksService: ApiTasksService,
    private readonly notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.columnsService.updateBoard({} as IGetBoardResp);
    this.columnsService.setBoardId(this.router.url.split('/').pop()!);
    // this.loaderService.enableLoader();
    this.apiBoardService
      .getBoard(this.currBoardId$.value)
      .pipe(
        // delay(1000000),
        tap((board) => {
          const connectedLists = [];
          for (let column of board.columns) {
            connectedLists.push(column.id);
          }
          // this.columns$.next(board.columns);
          this.columnsService.updateConnectedLists(connectedLists);
          this.columnsService.updateBoard(board);
        }),
        tap(() => {
          this.isNotDataColumns = false;
          this.cdr.detectChanges();
        }),
        catchError((err: IHttpErrors) => {
          this.notificationService.showError(ESiteUrls.columns, err);
          throw new Error(`${err.error.statusCode} ${err.error.message}`);
        })
      )
      .subscribe(/*() => this.loaderService.disableLoader()*/);
  }

  onDeleteColumn(columnId: string): void {
    let connectedLists = this.connectedLists$.value;
    connectedLists = connectedLists.filter((id) => id !== columnId);
    this.columnsService.updateConnectedLists(connectedLists);

    let dialog = this.dialogRef.open(DeletingPopupComponent, {
      data: { name: 'deleting-popup.del-column' },
      panelClass: 'custom',
    });
    dialog.afterClosed().subscribe((result) => {
      if (result === 'true') this.columnsService.deleteColumn(columnId);
    });
  }

  dropColumn(event: CdkDragDrop<IColumn[]>): void {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    const columns = event.container.data;
    const movedColumn = columns[event.currentIndex];
    const body: IUpdateColumnReq = {
      title: movedColumn.title,
      order: event.currentIndex + 1,
    };
    this.apiColumnsService.updateColumn(this.currBoardId$.value, movedColumn.id, body).subscribe();
  }

  dropTask(event: CdkDragDrop<ITask[]>, columnId: string): void {
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
      this.loaderService.enableLoader(true);

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
      this.apiTasksService
        .updateTransferredTask(prevColumnId, movedTask.id, body)
        .pipe(
          switchMap(() => this.apiBoardService.getBoard(this.currBoardId$.value)),
          tap((board) => this.columnsService.updateBoard(board))
        )
        .subscribe(() => this.loaderService.disableLoader());
    }
  }

  createColumnPopup(): void {
    this.elRef.nativeElement.scroll(9999, 0);
    this.dialogRef.open(CreateColumnPopupComponent, { panelClass: 'custom' });
  }

  createTaskPopup(columnId: string): void {
    this.dialogRef.open(CreateTaskPopupComponent, { data: columnId, width: '350px', panelClass: 'custom' });
  }

  columnTrackByFn(index: number, column: IColumn): string {
    return column.id;
  }
}
