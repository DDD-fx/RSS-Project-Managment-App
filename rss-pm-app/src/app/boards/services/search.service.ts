import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { ApiColumnsService } from 'src/app/api/services/api-colomns.service';
import { ITaskSearch } from '../models/boards.models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private apiBoardService: ApiBoardService, private apiColumnsService: ApiColumnsService) {}

  searchTasks(searchText: string): ITaskSearch[] {
    let tasksArray: ITaskSearch[] = [];
    this.apiBoardService.getBoards().pipe(
      map((boards: ICreateBoardResp[]) =>
        boards.forEach((board) => {
          this.apiBoardService.getBoard(board.id).pipe(
            map((item) => {
              console.log(item);
              item.columns.forEach((column) => {
                column.tasks.forEach((task) => {
                  if (task.title.includes(searchText)) {
                    tasksArray.push({
                      boardId: board.id,
                      boardName: board.title,
                      task: task,
                    });
                  }
                });
              });
            })
          );
        })
      )
    );
    return tasksArray;
  }
}
