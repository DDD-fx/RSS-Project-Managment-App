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
import { Location } from '@angular/common';
import { LoaderService } from '../../../shared/components/loader/loader.service';
import { addUserName } from '../../../NgRx/actions/storeActions';
import { Store } from '@ngrx/store';
import { getUserIdFromLs } from '../../../shared/shared.utils';

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
      newName: new FormControl(localStorage.getItem(ELocalStorage.userName), Validators.required),
      newLogin: new FormControl(localStorage.getItem(ELocalStorage.login), [
        Validators.required,
        Validators.minLength(3),
      ]),
      newPassword: new FormControl('', this.passwordValidator),
      repeatNewPassword: new FormControl(''),
      currentPassword: new FormControl('', Validators.required),
    },
    [this.matchValidator('newPassword', 'repeatNewPassword')]
  );

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly apiUserService: ApiUserService,
    private readonly notificationService: NotificationService,
    private readonly location: Location,
    private readonly loaderService: LoaderService,
    private store: Store
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
    this.userEditForm.controls.currentPassword.setErrors(null);
    this.hidePw();
  }

  onUserUpdate() {
    this.loaderService.enableLoader();
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

          return this.apiUserService.updateUser(getUserIdFromLs(), {
            name: this.userEditForm.get('newName')!.value!,
            login: this.userEditForm.get('newLogin')!.value!,
            password: pwToSend,
          });
        }),
        tap((resp) => {
          this.notificationService.showSuccess(ESiteUrls.userEdit);
          localStorage.setItem(ELocalStorage.login, resp.login);
          localStorage.setItem(ELocalStorage.userName, resp.name);
          this.store.dispatch(addUserName());
          this.setForm();
          this.loaderService.disableLoader();
        }),
        catchError((err: IHttpErrors) => {
          this.setForm();
          this.notificationService.showError(ESiteUrls.userEdit, err);
          throw new Error(`Error ${err.error.statusCode} ${err.error.message}`);
        })
      )
      .subscribe();
  }

  enableNameInput(): void {
    this.userEditForm.controls.newName.enable();
  }

  enableLoginInput(): void {
    this.userEditForm.controls.newLogin.enable();
  }

  enablePwInput(): void {
    this.userEditForm.controls.newPassword.enable();
    this.userEditForm.controls.repeatNewPassword.enable();
  }

  hidePw(): void {
    this.hideCurrPw = true;
    this.hideNewPw = true;
  }

  goBack(): void {
    void this.router.navigate([ESiteUrls.boards]);
  }
}
