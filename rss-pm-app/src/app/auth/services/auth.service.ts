import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogOut$ = new BehaviorSubject<boolean>(true);

  public userName$ = new BehaviorSubject<string>('Log in');

  onLogIn(): void {
    this.isLogOut$.next(false);
    this.userName$.next('Log out');
  }

  onLogOut(): void {
    localStorage.removeItem('token');
    this.userName$.next('Log in');
    this.isLogOut$.next(true);
  }
}
