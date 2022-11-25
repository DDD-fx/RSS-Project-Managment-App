import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError, forkJoin, Observable, switchMap, tap } from 'rxjs';
import { IGetBoardResp } from 'src/app/api/models/api-board.model';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { selectAllBoardsSuccess } from 'src/app/NgRx/selectors/storeSelectors';
import { ITaskSearch } from '../../models/boards.models';
import { ApiUserService } from '../../../api/services/api-user.service';
import { IHttpErrors } from '../../../api/models/errors.model';
import { ESiteUrls } from '../../../shared/shared.enums';
import { NotificationService } from '../../../api/notification.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

@Component({
  selector: 'app-popup-search-results',
  templateUrl: './popup-search-results.component.html',
  styleUrls: ['./popup-search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupSearchResultsComponent implements OnInit {
  public tasksArray: ITaskSearch[] = [];

  public sortedTasks: ITaskSearch[] = this.tasksArray;

  public order: string = 'asc';

  constructor(
    private readonly store: Store,
    private readonly loaderService: LoaderService,
    private readonly apiBoardService: ApiBoardService,
    private readonly apiUserService: ApiUserService,
    private readonly dialogRef: MatDialogRef<PopupSearchResultsComponent>,
    private readonly notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: { searchText: string }
  ) {}

  ngOnInit(): void {
    // this.loaderService.enableLoader();
    this.store
      .select(selectAllBoardsSuccess)
      .pipe(
        switchMap((boards) => {
          const observables: Observable<IGetBoardResp>[] = [];
          boards.forEach((board) => observables.push(this.apiBoardService.getBoard(board.id)));
          return forkJoin(observables);
        }),
        tap((boards) => {
          boards.forEach((board) =>
            board.columns.forEach((column) =>
              column.tasks.forEach((task) => {
                if (
                  task.title.toLowerCase().includes(this.data.searchText.toLowerCase()) ||
                  task.description.toLowerCase().includes(this.data.searchText.toLowerCase())
                )
                  this.apiUserService.getUser(task.userId).subscribe((user) => {
                    this.tasksArray.push({
                      boardId: board.id,
                      boardName: board.title,
                      task: task,
                      user: user.name,
                    });
                  });
              })
            )
          );
        }),
        catchError((err: IHttpErrors) => {
          this.notificationService.showError(ESiteUrls.columns, err);
          throw new Error(`${err.error.statusCode} ${err.error.message}`);
        })
      )
      .subscribe();
    // this.loaderService.disableLoader();
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
