import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ISignInReq, ISignInResp, ISignUpReq, ISignUpResp } from '../../api/models/api-models';
import { HttpClient } from '@angular/common/http';
import { EUrls } from '../../shared/shared.enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogOut$ = new BehaviorSubject<boolean>(true);

  public password = ''; ////////////

  // public userName$ = new BehaviorSubject<string>('Log in');

  constructor(private httpClient: HttpClient) {}

  onSignIn(data: ISignInReq): Observable<ISignInResp> {
    this.isLogOut$.next(false);
    return this.httpClient.post<ISignInResp>(EUrls.signin, data);
  }

  onSignUp(data: ISignUpReq): Observable<ISignUpResp> {
    this.isLogOut$.next(false);
    this.password = data.password; /////////////
    return this.httpClient.post<ISignUpResp>(EUrls.signup, data);
  }

  onLogOut(): void {
    this.isLogOut$.next(true);
  }
}
