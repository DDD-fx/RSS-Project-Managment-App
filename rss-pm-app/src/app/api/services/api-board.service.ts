import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICreateBoardReq, ICreateBoardResp, IGetBoardResp } from '../models/api-board.model';
import { EHttpParams, EUrls } from '../../shared/shared.enums';
import { createHttpParams } from '../../shared/shared.utils';

@Injectable({
  providedIn: 'root',
})
export class ApiBoardService {
  constructor(private httpClient: HttpClient) {}

  createBoard(data: ICreateBoardReq): Observable<ICreateBoardResp> {
    return this.httpClient.post<ICreateBoardResp>(EUrls.boards, data);
  }

  getBoard(): Observable<IGetBoardResp> {
    const params = createHttpParams(EHttpParams.boardId);
    return this.httpClient.get<IGetBoardResp>(EUrls.boards, { params });
  }

  // deleteBoard()
  // updateBoard()
}
