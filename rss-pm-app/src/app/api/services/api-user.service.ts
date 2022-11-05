import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EHttpParams, EUrls } from '../../shared/shared.enums';
import { Observable } from 'rxjs';
import { IGetAllUsersResp } from '../models/api-user.model';
import { createHttpParams } from '../../shared/shared.utils';
import { ISignUpResp } from '../../auth/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {
  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<IGetAllUsersResp> {
    return this.httpClient.get<IGetAllUsersResp>(EUrls.users);
  }

  getUser(): Observable<ISignUpResp> {
    const params = createHttpParams(EHttpParams.userId);
    return this.httpClient.get<ISignUpResp>(EUrls.users, { params });
  }

  deleteUser(): void {
    const params = createHttpParams(EHttpParams.userId);
    this.httpClient.delete(EUrls.users, { params });
  }

  updateUser(body: any): void {
    /////////////
    const params = createHttpParams(EHttpParams.userId);
    this.httpClient.put(EUrls.users, { body }, { params });
  }
}
