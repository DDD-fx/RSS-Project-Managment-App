import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationAbstract } from '../../validation-abstract';

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

  constructor(private readonly router: Router, private readonly authService: AuthService) {
    super();
  }

  onLogIn() {
    if (this.loginForm.valid) {
      // localStorage.setItem('token', 'test-token');
      // this.authService.onLogIn();
      void this.router.navigate(['']);
    }
  }
}
