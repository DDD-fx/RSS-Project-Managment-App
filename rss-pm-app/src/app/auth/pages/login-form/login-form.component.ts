import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationAbstract } from '../../validation-abstract';
import { catchError, switchMap, tap } from 'rxjs';
import { NotificationService } from '../../../api/notification.service';
import { ELocalStorage, ENotificationSources } from '../../../shared/shared.enums';
import { IHttpErrors } from '../../../api/models/errors.model';
import { ApiUserService } from '../../../api/services/api-user.service';
import { findUserByLogin } from '../../../shared/shared.utils';
import { addUserName, makeIsloggedTrue } from 'src/app/NgRx/actions/storeActions';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/NgRx/interfaces/store.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../login-form/login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent extends ValidationAbstract {
  public hide = true;

  public loginForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, this.passwordValidator]),
  });

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly apiUserService: ApiUserService,
    private store: Store<IStore>
  ) {
    super();
  }

  onLogIn() {
    this.authService
      .onSignIn({
        login: this.loginForm.get('login')!.value!,
        password: this.loginForm.get('password')!.value!,
      })
      .pipe(
        tap((resp) => {
          localStorage.setItem(ELocalStorage.token, resp.token);
          this.notificationService.showSuccess(ENotificationSources.signIn);
          void this.router.navigate(['']);
          this.store.dispatch(makeIsloggedTrue());
          this.store.dispatch(addUserName());
        }),
        switchMap(() => this.apiUserService.getAllUsers()),
        tap((resp) => {
          const userData = findUserByLogin(resp, this.loginForm.get('login')!.value!);
          localStorage.setItem(ELocalStorage.userName, userData.name);
          localStorage.setItem(ELocalStorage.userId, userData.id);
        }),
        catchError((err: IHttpErrors) => {
          this.notificationService.showError(ENotificationSources.signIn, err);
          throw new Error(`Error ${err.error.statusCode} ${err.error.message}`);
        })
      )
      .subscribe();
  }
}
