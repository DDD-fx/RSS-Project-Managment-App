import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EApiUrls, ELocalStorage } from '../../shared/shared.enums';
import { Observable } from 'rxjs';
import { IGetAllUsersResp } from '../models/api-user.model';
import { ISignUpReq, ISignUpResp } from '../../auth/models/auth.model';
import { getUserIdFromLs } from '../../shared/shared.utils';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {
  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<IGetAllUsersResp> {
    return this.httpClient.get<IGetAllUsersResp>(EApiUrls.users);
  }

  getUser(): Observable<ISignUpResp> {
    const userId = getUserIdFromLs();
    return this.httpClient.get<ISignUpResp>(EApiUrls.users + '/' + `${userId}`);
  }

  deleteUser(): void {
    const deletedId = localStorage.getItem(ELocalStorage.userId);
    console.log(deletedId);
    this.httpClient.delete(EApiUrls.users + '/' + `${deletedId}`);
  }

  updateUser(body: ISignUpReq): Observable<ISignUpResp> {
    const userId = getUserIdFromLs();
    return this.httpClient.put<ISignUpResp>(EApiUrls.users + '/' + `${userId}`, body);
  }
}
