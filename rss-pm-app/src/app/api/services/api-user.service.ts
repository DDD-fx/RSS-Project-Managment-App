import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EApiUrls } from '../../shared/shared.enums';
import { Observable } from 'rxjs';
import { IGetAllUsersResp } from '../models/api-user.model';
import { ISignUpReq, ISignUpResp } from '../../auth/models/auth.model';
import { getUserIdFromLs } from '../../shared/shared.utils';
import { LoaderService } from '../../shared/components/loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {
  constructor(private httpClient: HttpClient, private readonly loaderService: LoaderService) {}

  getAllUsers(): Observable<IGetAllUsersResp> {
    this.loaderService.enableLoader();
    return this.httpClient.get<IGetAllUsersResp>(EApiUrls.users);
  }

  getUser(): Observable<ISignUpResp> {
    this.loaderService.enableLoader();
    return this.httpClient.get<ISignUpResp>(EApiUrls.users + `/${getUserIdFromLs()}`);
  }

  deleteUser(): void {
    this.loaderService.enableLoader();
    this.httpClient.delete(EApiUrls.users + `/${getUserIdFromLs()}`).subscribe();
    this.loaderService.disableLoader();
  }

  updateUser(body: ISignUpReq): Observable<ISignUpResp> {
    this.loaderService.enableLoader();
    return this.httpClient.put<ISignUpResp>(EApiUrls.users + `/${getUserIdFromLs()}`, body);
  }
}
