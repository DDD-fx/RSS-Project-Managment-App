import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidationAbstract } from '../../validation-abstract';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['../login-form/login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegFormComponent extends ValidationAbstract {
  public regForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      login: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, this.passwordValidator]),
      confirmPassword: new FormControl('', Validators.required),
    },
    [this.matchValidator('password', 'confirmPassword')]
  );

  constructor(private readonly router: Router, private readonly authService: AuthService) {
    super();
  }

  onSignUp() {
    if (this.regForm.valid) {
      // localStorage.setItem('token', 'test-token');
      // this.authService.onLogIn();
      void this.router.navigate(['']);
    }
  }
}
