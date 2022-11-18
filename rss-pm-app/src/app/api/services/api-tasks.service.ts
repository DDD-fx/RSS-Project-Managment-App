import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateTaskReq, ICreateTaskResp } from '../models/api-board.model';
import { EApiUrls } from '../../shared/shared.enums';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiTasksService {
  private readonly currBoardId = this.router.url.split('/').pop()!;

  constructor(private readonly httpClient: HttpClient, private readonly router: Router) {}

  // getAllColumns(boardId: string): Observable<ICreateColumnResp[]> {
  //   return this.httpClient.get<ICreateColumnResp[]>(EApiUrls.boards + `/${boardId}` + `/${EApiUrls.columns}`);
  // }

  createNewTask(columnId: string, body: ICreateTaskReq): Observable<ICreateTaskResp> {
    return this.httpClient.post<ICreateTaskResp>(
      EApiUrls.boards + `/${this.currBoardId}` + `/${EApiUrls.columns}` + `/${columnId}` + `/${EApiUrls.tasks}`,
      body
    );
  }

  // updateColumn(boardId: string, columnId: string, body: IUpdateColumnReq): Observable<ICreateColumnResp> {
  //   return this.httpClient.put<ICreateColumnResp>(
  //     EApiUrls.boards + `/${boardId}` + `/${EApiUrls.columns}` + `/${columnId}`,
  //     body
  //   );
  // }
  //
  // deleteColumn(boardId: string, columnId: string): Observable<Object> {
  //   return this.httpClient.delete(EApiUrls.boards + `/${boardId}` + `/${EApiUrls.columns}` + `/${columnId}`);
  // }
}
