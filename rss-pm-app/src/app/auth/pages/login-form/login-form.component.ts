import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationAbstract } from '../../validation-abstract';
import { catchError, tap } from 'rxjs';
import { NotificationService } from '../../../api/notification.service';
import { ENotificationSources } from '../../../shared/shared.enums';
import { IHttpErrors } from '../../../api/models/api-models';

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
    private readonly notificationService: NotificationService
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
          localStorage.setItem('token', resp.token);
          this.notificationService.showSuccess(ENotificationSources.signIn);
          void this.router.navigate(['']);
        }),
        catchError((err: IHttpErrors) => {
          console.log(err);
          this.notificationService.showError(ENotificationSources.signIn, err);
          throw new Error(`Error ${err.error.statusCode} ${err.error.message}`);
        })
      )
      .subscribe();
  }
}
