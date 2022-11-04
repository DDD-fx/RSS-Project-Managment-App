import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EUrls } from '../../shared/shared.enums';
import { Observable } from 'rxjs';
import { IGetAllUsersResp } from '../models/api-user.model';
import { createHttpParams } from '../../shared/shared.utils';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {
  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<IGetAllUsersResp> {
    return this.httpClient.get<IGetAllUsersResp>(EUrls.users);
  }

  deleteUser(): void {
    const params = createHttpParams('id');
    this.httpClient.delete(EUrls.users, { params });
  }

  updateUser(body: any): void {
    /////////////
    const params = createHttpParams('id');
    this.httpClient.put(EUrls.users, { body }, { params });
  }
}
