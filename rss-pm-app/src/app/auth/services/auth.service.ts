import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISignInReq, ISignInResp, ISignUpReq, ISignUpResp } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { EApiUrls } from '../../shared/shared.enums';
import { LoaderService } from '../../shared/components/loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient, private readonly loaderService: LoaderService) {}

  onSignIn(data: ISignInReq): Observable<ISignInResp> {
    this.loaderService.enableLoader();
    return this.httpClient.post<ISignInResp>(EApiUrls.signin, data);
  }

  onSignUp(data: ISignUpReq): Observable<ISignUpResp> {
    this.loaderService.enableLoader();
    return this.httpClient.post<ISignUpResp>(EApiUrls.signup, data);
  }

  onLogOut(): void {
    // this.isLogOut$.next(true);
  }
}
