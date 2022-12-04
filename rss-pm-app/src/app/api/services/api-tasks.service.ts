import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateTaskReq, ICreateTaskResp, IUpdateTaskReq, IUpdateTaskResp } from '../models/api-board.model';
import { EApiUrls } from '../../shared/shared.enums';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiTasksService {
  constructor(private readonly httpClient: HttpClient, private readonly router: Router) {}

  createNewTask(columnId: string, body: ICreateTaskReq): Observable<ICreateTaskResp> {
    const currBoardId = this.router.url.split('/').pop();
    return this.httpClient.post<ICreateTaskResp>(
      EApiUrls.boards + `/${currBoardId}` + `/${EApiUrls.columns}` + `/${columnId}` + `/${EApiUrls.tasks}`,
      body
    );
  }

  updateTask(taskId: string, body: IUpdateTaskReq): Observable<IUpdateTaskResp> {
    return this.httpClient.put<IUpdateTaskResp>(
      EApiUrls.boards +
        `/${body.boardId}` +
        `/${EApiUrls.columns}` +
        `/${body.columnId}` +
        `/${EApiUrls.tasks}` +
        `/${taskId}`,
      body
    );
  }

  updateTransferredTask(prevColumnId: string, taskId: string, body: IUpdateTaskReq): Observable<IUpdateTaskResp> {
    return this.httpClient.put<IUpdateTaskResp>(
      EApiUrls.boards +
        `/${body.boardId}` +
        `/${EApiUrls.columns}` +
        `/${prevColumnId}` +
        `/${EApiUrls.tasks}` +
        `/${taskId}`,
      body
    );
  }

  deleteTask(boardId: string, columnId: string, taskId: string): Observable<Object> {
    return this.httpClient.delete(
      EApiUrls.boards + `/${boardId}` + `/${EApiUrls.columns}` + `/${columnId}` + `/${EApiUrls.tasks}` + `/${taskId}`
    );
  }
}
