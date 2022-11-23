import { Injectable } from '@angular/core';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { ApiColumnsService } from 'src/app/api/services/api-colomns.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private apiBoardService: ApiBoardService, private apiColumnsService: ApiColumnsService) {}

  // tasksArray: ITaskSearch[] = [];

  // searchTasks(searchText: string) {
  //   this.apiBoardService.getBoards().pipe(
  //     map((boards: ICreateBoardResp[]) =>
  //       boards.forEach((board) => {
  //         this.apiBoardService.getBoard(board.id).pipe(
  //           map((item) => {
  //             console.log(item);
  //             item.columns.forEach((column) => {
  //               column.tasks.forEach((task) => {
  //                 if (task.title.includes(searchText)) {
  //                   this.tasksArray.push({
  //                     boardId: board.id,
  //                     boardName: board.title,
  //                     task: task,
  //                   });
  //                 }
  //               });
  //             });
  //           })
  //         );
  //       })
  //     )
  //   );
  // }
}
