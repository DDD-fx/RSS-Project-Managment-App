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

  getBoard(): Observable<IGetBoardResp> {
    return this.httpClient.get<IGetBoardResp>(EApiUrls.boards);
  }

  // deleteBoard()
  // updateBoard()
}
