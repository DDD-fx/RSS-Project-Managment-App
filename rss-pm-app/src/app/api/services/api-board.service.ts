import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ICreateBoardReq, ICreateBoardResp, IGetBoardResp } from '../models/api-board.model';
import { EApiUrls } from '../../shared/shared.enums';
import { Router } from '@angular/router';
import { LoaderService } from '../../shared/components/loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class ApiBoardService {
  constructor(private httpClient: HttpClient, private router: Router, private readonly loaderService: LoaderService) {}

  createBoard(data: ICreateBoardReq): Observable<ICreateBoardResp> {
    this.loaderService.enableLoader();
    return this.httpClient.post<ICreateBoardResp>(EApiUrls.boards, data);
  }

  getBoard(id: string): Observable<IGetBoardResp> {
    this.loaderService.enableLoader();
    return this.httpClient.get<IGetBoardResp>(EApiUrls.boards + `/${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        if (!err.ok) {
          this.router.navigateByUrl('/404');
        }
        return [];
      })
    );
  }

  getBoards(): Observable<ICreateBoardResp[]> {
    this.loaderService.enableLoader();
    return this.httpClient.get(EApiUrls.boards) as Observable<ICreateBoardResp[]>;
  }

  deleteBoard(id: string): void {
    this.loaderService.enableLoader();
    this.httpClient.delete(EApiUrls.boards + `/${id}`).subscribe();
    this.loaderService.disableLoader();
  }

  updateBoard(id: string, body: ICreateBoardReq): Observable<ICreateBoardResp> {
    this.loaderService.enableLoader();
    return this.httpClient.put<ICreateBoardResp>(EApiUrls.boards + `/${id}`, body);
  }
}
