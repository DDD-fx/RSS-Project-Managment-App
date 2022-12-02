import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError, forkJoin, Observable, of, switchMap, tap } from 'rxjs';
import { IGetBoardResp } from 'src/app/api/models/api-board.model';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { selectAllBoardsSuccess } from 'src/app/NgRx/selectors/storeSelectors';
import { ITaskSearch, ITaskSearchWithoutUser } from '../../models/boards.models';
import { ApiUserService } from '../../../api/services/api-user.service';
import { IHttpErrors } from '../../../api/models/errors.model';
import { ESiteUrls } from '../../../shared/shared.enums';
import { NotificationService } from '../../../api/notification.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ISignUpResp } from '../../../auth/models/auth.model';

@Component({
  selector: 'app-popup-search-results',
  templateUrl: './popup-search-results.component.html',
  styleUrls: ['./popup-search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupSearchResultsComponent implements OnInit, DoCheck {
  public tasksArray: ITaskSearch[] = [];

  public sortedTasks!: ITaskSearch[];

  public noTasks = false;

  public order: string = 'asc';

  public disableLoader = false;

  constructor(
    private readonly store: Store,
    private readonly loaderService: LoaderService,
    private readonly apiBoardService: ApiBoardService,
    private readonly apiUserService: ApiUserService,
    private readonly dialogRef: MatDialogRef<PopupSearchResultsComponent>,
    private readonly notificationService: NotificationService,
    private readonly cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { searchText: string }
  ) {}

  ngOnInit(): void {
    const taskData: ITaskSearchWithoutUser[] = [];
    this.store
      .select(selectAllBoardsSuccess)
      .pipe(
        switchMap((boards) => {
          const observables: Observable<IGetBoardResp>[] = [];
          boards.forEach((board) => observables.push(this.apiBoardService.getBoard(board.id)));
          return forkJoin(observables);
        }),
        switchMap((boards) => {
          const observables: Observable<ISignUpResp>[] = [];
          boards.forEach((board) =>
            board.columns.forEach((column) =>
              column.tasks.forEach((task) => {
                if (
                  task.title.toLowerCase().includes(this.data.searchText.toLowerCase()) ||
                  task.description.toLowerCase().includes(this.data.searchText.toLowerCase())
                ) {
                  observables.push(this.apiUserService.getUser(task.userId));
                  taskData.push({
                    boardId: board.id,
                    boardName: board.title,
                    task: task,
                  });
                }
              })
            )
          );
          if (observables.length) return forkJoin(observables);
          else return of(null);
        }),
        tap((users) => {
          if (users) {
            this.tasksArray = taskData.map((task, index) => ({
              ...task,
              user: users[index]?.name,
            }));
          } else {
            this.noTasks = true;
          }
          this.disableLoader = true;
          this.cdr.detectChanges();
        }),
        catchError((err: IHttpErrors) => {
          this.dialogRef.close();
          this.notificationService.showError(ESiteUrls.boards, err);
          throw new Error(`${err.error.statusCode} ${err.error.message}`);
        })
      )
      .subscribe();
  }

  ngDoCheck(): void {
    this.sortedTasks = this.tasksArray;
    this.cdr.detectChanges();
  }

  closeSearchResult() {
    this.dialogRef.close();
  }

  sortBoards() {
    if (this.order === 'desc') {
      this.order = 'asc';
    } else {
      this.order = 'desc';
    }
  }

  sortByTitle(args: string) {
    return this.sortedTasks.sort((a, b) => {
      if (args === 'asc') {
        return a.task.title.toLowerCase() > b.task.title.toLowerCase() ? 1 : -1;
      } else {
        return a.task.title.toLowerCase() > b.task.title.toLowerCase() ? -1 : 1;
      }
    });
  }

  sortByDescription(args: string) {
    return this.sortedTasks.sort((a, b) => {
      if (args === 'asc') {
        return a.task.description.toLowerCase() > b.task.description.toLowerCase() ? 1 : -1;
      } else {
        return a.task.description.toLowerCase() > b.task.description.toLowerCase() ? -1 : 1;
      }
    });
  }

  sortByUser(args: string) {
    return this.sortedTasks.sort((a, b) => {
      if (args === 'asc') {
        return a.boardName.toLowerCase() > b.boardName.toLowerCase() ? 1 : -1;
      } else {
        return a.boardName.toLowerCase() > b.boardName.toLowerCase() ? -1 : 1;
      }
    });
  }

  sortByBoard(args: string) {
    return this.sortedTasks.sort((a, b) => {
      if (args === 'asc') {
        return a.boardName.toLowerCase() > b.boardName.toLowerCase() ? 1 : -1;
      } else {
        return a.boardName.toLowerCase() > b.boardName.toLowerCase() ? -1 : 1;
      }
    });
  }
}
