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

<<<<<<< HEAD
  createBoard({ title, description }: ICreateBoardReq): Observable<any> {
    return this.httpClient.post<ICreateBoardResp>(EUrls.boards, { title, description });
=======
  createBoard(data: ICreateBoardReq): Observable<ICreateBoardResp> {
    return this.httpClient.post<ICreateBoardResp>(EApiUrls.boards, data);
>>>>>>> origin/develop
  }

  getBoard(): Observable<IGetBoardResp> {
    return this.httpClient.get<IGetBoardResp>(EApiUrls.boards);
  }

  getBoards(): Observable<ICreateBoardResp[]> {
    return this.httpClient.get(EUrls.boards) as Observable<ICreateBoardResp[]>;
  }

  deleteBoard(id: string): void {
    this.httpClient.delete(EUrls.boards + `/${id}`).subscribe();
  }

  // updateBoard()
}
