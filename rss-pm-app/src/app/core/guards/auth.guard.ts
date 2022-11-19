import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { ELocalStorage, ESiteUrls } from '../../shared/shared.enums';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  token!: string;

  canActivate(): boolean | UrlTree {
    if (localStorage.getItem(ELocalStorage.userId)) {
      return true;
    }
    void this.router.navigate([ESiteUrls.signIn]);
    return false;
  }
}
