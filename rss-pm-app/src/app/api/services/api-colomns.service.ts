import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EApiUrls } from '../../shared/shared.enums';
import { Observable } from 'rxjs';
import { ICreateColumnReq, ICreateColumnResp, IUpdateColumnReq } from '../models/api-board.model';

@Injectable({
  providedIn: 'root',
})
export class ApiColumnsService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllColumns(boardId: string): Observable<ICreateColumnResp[]> {
    return this.httpClient.get<ICreateColumnResp[]>(EApiUrls.boards + `/${boardId}` + `/${EApiUrls.columns}`);
  }

  createNewColumn(boardId: string, body: ICreateColumnReq): Observable<ICreateColumnResp> {
    // const payload = { title: `${title}` };
    return this.httpClient.post<ICreateColumnResp>(EApiUrls.boards + `/${boardId}` + `/${EApiUrls.columns}`, body);
  }

  updateColumn(boardId: string, columnId: string, body: IUpdateColumnReq): Observable<ICreateColumnResp> {
    return this.httpClient.put<ICreateColumnResp>(
      EApiUrls.boards + `/${boardId}` + `/${EApiUrls.columns}` + `/${columnId}`,
      body
    );
  }

  deleteColumn(boardId: string, columnId: string): Observable<Object> {
    return this.httpClient.delete(EApiUrls.boards + `/${boardId}` + `/${EApiUrls.columns}` + `/${columnId}`);
  }
}
