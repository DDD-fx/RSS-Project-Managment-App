import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectToken } from 'src/app/NgRx/selectors/storeSelectors';
import { getTokenFromLS } from 'src/app/shared/shared.utils';
import { ELocalStorage, ESiteUrls } from '../../shared/shared.enums';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  token!: string;

  canActivate(): boolean | UrlTree {
    if (localStorage.getItem(ELocalStorage.userId)) {
      this.store
        .select(selectToken)
        .pipe()
        .subscribe((resp) => (this.token = resp));
      const tokenFromLS = getTokenFromLS();
      console.log(tokenFromLS);
      if (this.token === tokenFromLS) {
        return true;
      } else {
        return false;
      }
    }
    void this.router.navigate([ESiteUrls.signIn]);
    return false;
  }
}
