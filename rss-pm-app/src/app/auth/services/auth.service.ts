/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISignInReq, ISignInResp, ISignUpReq, ISignUpResp } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { EApiUrls, ELocalStorage } from '../../shared/shared.enums';
import { LoaderService } from '../../shared/components/loader/loader.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { makeIsloggedFalse, removeUserName } from 'src/app/NgRx/actions/storeActions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private readonly loaderService: LoaderService,
    private store: Store,
    private router: Router
  ) {}

  onSignIn(data: ISignInReq): Observable<ISignInResp> {
    this.loaderService.enableLoader();
    return this.httpClient.post<ISignInResp>(EApiUrls.signin, data);
  }

  onSignUp(data: ISignUpReq): Observable<ISignUpResp> {
    this.loaderService.enableLoader();
    return this.httpClient.post<ISignUpResp>(EApiUrls.signup, data);
  }

  onLogOut(): void {
    localStorage.removeItem(ELocalStorage.token);
    localStorage.removeItem(ELocalStorage.login);
    localStorage.removeItem(ELocalStorage.userName);
    localStorage.removeItem(ELocalStorage.userId);
    this.store.dispatch(removeUserName());
    this.store.dispatch(makeIsloggedFalse());
  }
}
