import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ELocalStorage, EApiUrls } from '../../shared/shared.enums';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (localStorage.getItem(ELocalStorage.userId)) {
      return true;
    }
    void this.router.navigate([EApiUrls.signin]);
    return false;
  }
}
