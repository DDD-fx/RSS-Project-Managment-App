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

  public userEditForm = new FormGroup(
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

  setForm() {
    this.userEditForm.setValue({
      newName: localStorage.getItem(ELocalStorage.userName),
      newLogin: localStorage.getItem(ELocalStorage.login),
      currentPassword: '',
      newPassword: '',
      repeatNewPassword: '',
    });
    this.userEditForm.controls.newName.disable();
    this.userEditForm.controls.newLogin.disable();
    this.userEditForm.controls.newPassword.disable();
    this.userEditForm.controls.repeatNewPassword.disable();
    this.userEditForm.controls.currentPassword.setErrors(null);
  }

  onUserUpdate() {
    this.authService
      .onSignIn({
        login: localStorage.getItem(ELocalStorage.login)!,
        password: this.userEditForm.get('currentPassword')!.value!,
      })
      .pipe(
        switchMap(() => {
          const pwToSend = this.userEditForm.get('newPassword')?.value
            ? this.userEditForm.get('newPassword')?.value!
            : this.userEditForm.get('currentPassword')?.value!;

          return this.apiUserService.updateUser({
            name: this.userEditForm.get('newName')!.value!,
            login: this.userEditForm.get('newLogin')!.value!,
            password: pwToSend,
          });
        }),
        tap((resp) => {
          this.notificationService.showSuccess(ESiteUrls.userEdit);
          localStorage.setItem(ELocalStorage.login, resp.login);
          localStorage.setItem(ELocalStorage.userName, resp.name);
          this.setForm();
        }),
        catchError((err: IHttpErrors) => {
          this.notificationService.showError(ESiteUrls.userEdit, err);
          throw new Error(`Error ${err.error.statusCode} ${err.error.message}`);
        })
      )
      .subscribe();
  }

  enableNameInput() {
    this.userEditForm.controls.newName.enable();
  }

  enableLoginInput() {
    this.userEditForm.controls.newLogin.enable();
  }

  enablePwInput() {
    this.userEditForm.controls.newPassword.enable();
    this.userEditForm.controls.repeatNewPassword.enable();
  }
}
