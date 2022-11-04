import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationAbstract } from '../../validation-abstract';
import { catchError, switchMap, tap } from 'rxjs';
import { IHttpErrors } from '../../../api/models/errors.model';
import { ELocalStorage, ENotificationSources } from '../../../shared/shared.enums';
import { NotificationService } from '../../../api/notification.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['../login-form/login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegFormComponent extends ValidationAbstract {
  public hide = true;

  public regForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      login: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, this.passwordValidator]),
      confirmPassword: new FormControl('', Validators.required),
    },
    [this.matchValidator('password', 'confirmPassword')]
  );

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService
  ) {
    super();
  }

  onSignUp() {
    this.authService
      .onSignUp({
        name: this.regForm.get('name')!.value!,
        login: this.regForm.get('login')!.value!,
        password: this.regForm.get('password')!.value!,
      })
      .pipe(
        tap((resp) => {
          localStorage.setItem(ELocalStorage.userId, resp.id);
          localStorage.setItem(ELocalStorage.userName, resp.name);
        }),
        switchMap((resp) =>
          this.authService.onSignIn({ login: resp.login, password: this.regForm.get('password')!.value! })
        ),
        tap((resp) => {
          localStorage.setItem(ELocalStorage.token, resp.token);
          void this.router.navigate(['']);
        }),
        catchError((err: IHttpErrors) => {
          this.notificationService.showError(ENotificationSources.signUp, err);
          throw new Error(`Error ${err.error.statusCode} ${err.error.message}`);
        })
      )
      .subscribe();
  }
}
