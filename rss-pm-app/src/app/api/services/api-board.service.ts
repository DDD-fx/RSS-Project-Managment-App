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

  createBoard({ title, description }: ICreateBoardReq): Observable<ICreateBoardResp> {
    return this.httpClient.post<ICreateBoardResp>(EApiUrls.boards, { title, description });
  }

  getBoard(): Observable<IGetBoardResp> {
    return this.httpClient.get<IGetBoardResp>(EApiUrls.boards);
  }

  getBoards(): Observable<ICreateBoardResp[]> {
    return this.httpClient.get(EApiUrls.boards) as Observable<ICreateBoardResp[]>;
  }

  deleteBoard(id: string): void {
    this.httpClient.delete(EApiUrls.boards + `/${id}`).subscribe();
  }

  updateBoard(id: string, { title, description }: ICreateBoardReq): Observable<ICreateBoardResp> {
    return this.httpClient.put<ICreateBoardResp>(EApiUrls.boards + '/' + `${id}`, { title, description });
  }
}
