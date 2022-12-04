import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ELocalStorage, ESiteUrls } from 'src/app/shared/shared.enums';

@Injectable({
  providedIn: 'root',
})
export class WelcomeGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (localStorage.getItem(ELocalStorage.userId)) {
      void this.router.navigate([ESiteUrls.boards]);
      return false;
    }
    return true;
  }
}
