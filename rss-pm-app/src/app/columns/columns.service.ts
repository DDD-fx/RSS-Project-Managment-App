import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { ICreateTaskReq, IGetBoardResp } from '../api/models/api-board.model';
import { ApiTasksService } from '../api/services/api-tasks.service';
import { ApiBoardService } from '../api/services/api-board.service';
import { Router } from '@angular/router';
import { LoaderService } from '../shared/components/loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  public board$ = new BehaviorSubject<IGetBoardResp>({} as IGetBoardResp);

  readonly currBoardId = this.router.url.split('/').pop()!;

  constructor(
    private readonly apiTasksService: ApiTasksService,
    private readonly apiBoardService: ApiBoardService,
    private readonly router: Router,
    private readonly loaderService: LoaderService
  ) {}

  createNewTask(columnId: string, body: ICreateTaskReq) {
    this.loaderService.enableLoader();
    this.apiTasksService
      .createNewTask(columnId, body)
      .pipe(
        switchMap(() => this.apiBoardService.getBoard(this.currBoardId)),
        tap((board) => {
          this.board$.next(board);
        })
      )
      .subscribe(() => this.loaderService.disableLoader());
  }
}
