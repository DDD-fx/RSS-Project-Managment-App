import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateBoardReq, ICreateBoardResp, IGetBoardResp } from '../models/api-board.model';
import { EApiUrls } from '../../shared/shared.enums';

@Injectable({
  providedIn: 'root',
})
export class ApiBoardService {
  constructor(private httpClient: HttpClient) {}

  createBoard(data: ICreateBoardReq): Observable<ICreateBoardResp> {
    return this.httpClient.post<ICreateBoardResp>(EApiUrls.boards, data);
  }

  getBoard(id: string): Observable<IGetBoardResp> {
    return this.httpClient.get<IGetBoardResp>(EApiUrls.boards + `/${id}`);
  }

  getBoards(): Observable<ICreateBoardResp[]> {
    return this.httpClient.get(EApiUrls.boards) as Observable<ICreateBoardResp[]>;
  }

  deleteBoard(id: string): Observable<Object> {
    return this.httpClient.delete(EApiUrls.boards + `/${id}`);
  }

  updateBoard(body: ICreateBoardReq, id: string): Observable<ICreateBoardResp> {
    return this.httpClient.put<ICreateBoardResp>(EApiUrls.boards + `/${id}`, body);
  }
}
