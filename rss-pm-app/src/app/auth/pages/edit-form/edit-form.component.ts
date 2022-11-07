import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationAbstract } from '../../validation-abstract';
import { catchError, switchMap, tap } from 'rxjs';
import { IHttpErrors } from '../../../api/models/errors.model';
import { ELocalStorage, ESiteUrls } from '../../../shared/shared.enums';
import { NotificationService } from '../../../api/notification.service';
import { ApiUserService } from '../../../api/services/api-user.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['../login-form/login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFormComponent extends ValidationAbstract {
  public hideNewPw = true;

  public hideCurrPw = true;

  public regForm = new FormGroup(
    {
      newName: new FormControl(
        { value: localStorage.getItem(ELocalStorage.userName), disabled: true },
        Validators.required
      ),
      newLogin: new FormControl({ value: localStorage.getItem(ELocalStorage.login), disabled: true }, [
        Validators.required,
        Validators.minLength(3),
      ]),
      newPassword: new FormControl({ value: '', disabled: true }, this.passwordValidator),
      repeatNewPassword: new FormControl({ value: '', disabled: true }),
      currentPassword: new FormControl('', Validators.required),
    },
    [this.matchValidator('newPassword', 'repeatNewPassword')]
  );

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly apiUserService: ApiUserService,
    private readonly notificationService: NotificationService
  ) {
    super();
  }

  onUserUpdate() {
    this.authService
      .onSignIn({
        login: localStorage.getItem(ELocalStorage.login)!,
        password: this.regForm.get('currentPassword')!.value!,
      })
      .pipe(
        switchMap(() =>
          this.apiUserService.updateUser({
            name: this.regForm.get('newName')!.value!,
            login: this.regForm.get('newLogin')!.value!,
            password: this.regForm.get('currentPassword')!.value!,
          })
        ),
        tap((resp) => {
          localStorage.setItem(ELocalStorage.login, resp.login);
          localStorage.setItem(ELocalStorage.userName, resp.name);
        }),
        catchError((err: IHttpErrors) => {
          this.notificationService.showError(ESiteUrls.userEdit, err);
          throw new Error(`Error ${err.error.statusCode} ${err.error.message}`);
        })
      )
      .subscribe();

    // if (resp$) {
    //
    // }
  }

  enableNameInput() {
    this.regForm.controls.newName.enable();
  }

  enableLoginInput() {
    this.regForm.controls.newLogin.enable();
  }

  enablePwInput() {
    this.regForm.controls.newPassword.enable();
    this.regForm.controls.repeatNewPassword.enable();
  }
}
