import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ISignInReq, ISignInResp } from '../../api/models/api-models';
import { HttpClient } from '@angular/common/http';
import { EUrls } from '../../shared/shared.enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogOut$ = new BehaviorSubject<boolean>(true);

  // public userName$ = new BehaviorSubject<string>('Log in');

  constructor(private httpClient: HttpClient) {}

  onSignIn(data: ISignInReq): Observable<ISignInResp> {
    this.isLogOut$.next(false);
    return this.httpClient.post<ISignInResp>(EUrls.signin, data);
    // this.userName$.next('Log out');
  }

  onLogOut(): void {
    // localStorage.removeItem('token');
    // this.userName$.next('Log in');
    this.isLogOut$.next(true);
  }
}
