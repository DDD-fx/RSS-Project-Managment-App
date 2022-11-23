import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { ISignUpResp } from 'src/app/auth/models/auth.model';
import { selectAllBoardsSuccess } from 'src/app/NgRx/selectors/storeSelectors';
import { EApiUrls } from 'src/app/shared/shared.enums';
import { ITaskSearch } from '../../models/boards.models';

@Component({
  selector: 'app-popup-search-results',
  templateUrl: './popup-search-results.component.html',
  styleUrls: ['./popup-search-results.component.scss'],
})
export class PopupSearchResultsComponent implements OnInit {
  boards!: ICreateBoardResp[] | [];

  tasksArray: ITaskSearch[] = [];

  order: string = 'asc';

  param!: string;

  constructor(
    private store: Store,
    private httpClient: HttpClient,
    private apiBoardService: ApiBoardService,
    private dialogRef: MatDialogRef<PopupSearchResultsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { searchText: string }
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectAllBoardsSuccess)
      .pipe(
        map((boards) => {
          this.boards = boards;
          this.boards.forEach((board) => {
            this.apiBoardService.getBoard(board.id).subscribe((item) => {
              item.columns.forEach((column) => {
                column.tasks.forEach((task) => {
                  if (task.title.includes(this.data.searchText) || task.description.includes(this.data.searchText)) {
                    const userName = this.httpClient
                      .get<ISignUpResp>(EApiUrls.users + `/${task.userId}`)
                      .pipe(map((user) => user.name));
                    this.tasksArray.push({
                      boardId: board.id,
                      boardName: board.title,
                      task: task,
                      user: userName,
                    });
                  }
                });
              });
            });
          });
        })
      )
      .subscribe();
  }

  closeSearchResult() {
    this.dialogRef.close();
  }

  sortTasks() {
    if (this.order === 'desc') {
      this.order = 'asc';
    } else {
      this.order = 'desc';
    }
  }

  getParam(value: string) {
    this.param = value;
  }
}
