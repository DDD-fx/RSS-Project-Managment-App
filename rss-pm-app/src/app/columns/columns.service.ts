import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { ICreateColumnReq, ICreateTaskReq, IGetBoardResp, IUpdateTaskReq } from '../api/models/api-board.model';
import { ApiTasksService } from '../api/services/api-tasks.service';
import { ApiBoardService } from '../api/services/api-board.service';
import { Router } from '@angular/router';
import { LoaderService } from '../shared/components/loader/loader.service';
import { ApiColumnsService } from '../api/services/api-colomns.service';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  public board$ = new BehaviorSubject<IGetBoardResp>({} as IGetBoardResp);

  readonly currBoardId$ = new BehaviorSubject('');

  public connectedLists$ = new BehaviorSubject<string[]>([]);

  constructor(
    private readonly apiBoardService: ApiBoardService,
    private readonly apiColumnsService: ApiColumnsService,
    private readonly apiTasksService: ApiTasksService,
    private readonly router: Router,
    private readonly loaderService: LoaderService
  ) {}

  createNewColumn(body: ICreateColumnReq): void {
    this.loaderService.enableLoader();
    this.apiColumnsService
      .createNewColumn(this.currBoardId$.value, body)
      .pipe(
        tap((column) => {
          const newConnectedLists = this.connectedLists$.value;
          newConnectedLists.push(column.id);
          this.connectedLists$.next(newConnectedLists);
        }),
        switchMap(() => this.apiBoardService.getBoard(this.currBoardId$.value)),
        tap((board) => {
          this.board$.next(board);
        })
      )
      .subscribe(() => this.loaderService.disableLoader());
  }

  createNewTask(columnId: string, body: ICreateTaskReq): void {
    this.loaderService.enableLoader();
    this.apiTasksService
      .createNewTask(columnId, body)
      .pipe(
        switchMap(() => this.apiBoardService.getBoard(this.currBoardId$.value)),
        tap((board) => {
          this.board$.next(board);
        })
      )
      .subscribe(() => this.loaderService.disableLoader());
  }

  updateTask(taskId: string, body: IUpdateTaskReq): void {
    this.loaderService.enableLoader();
    this.apiTasksService
      .updateTask(taskId, body)
      .pipe(
        switchMap(() => this.apiBoardService.getBoard(this.currBoardId$.value)),
        tap((board) => {
          this.board$.next(board);
        })
      )
      .subscribe(() => this.loaderService.disableLoader());
  }

  setBoardId(id: string): void {
    this.currBoardId$.next(id);
  }

  updatedBoard(data: IGetBoardResp): void {
    this.board$.next(data);
  }

  updateConnectedLists(data: string[]): void {
    this.connectedLists$.next(data);
  }
}
