/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ApiUserService } from 'src/app/api/services/api-user.service';
import { addUserName, makeIsloggedTrue } from 'src/app/NgRx/actions/storeActions';
import { selectIsLogged, selectUserName } from 'src/app/NgRx/selectors/storeSelectors';
import { MatDialog } from '@angular/material/dialog';
import { DeletingPopupComponent } from '../../../shared/components/deleting-popup/deleting-popup.component';
import { ELocalStorage, ESiteUrls } from '../../../shared/shared.enums';
import { CreatingBoardPopupComponent } from '../../../shared/components/creating-board-popup/creating-board-popup.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { getTokenFromLS, getUserIdFromLs } from 'src/app/shared/shared.utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;

  isLoggedStore$: Observable<boolean> | undefined;

  userName$: Observable<string | null> | undefined;

  checked: string = '';

  constructor(
    private translate: TranslateService,
    private store: Store,
    private router: Router,
    private apiService: ApiUserService,
    private authService: AuthService,
    private dialogRef: MatDialog
  ) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    translate.use('en');
    this.isLoggedStore$ = this.store.select(selectIsLogged);
    this.userName$ = this.store.select(selectUserName);
  }

  ngOnInit() {
    if (localStorage.getItem(ELocalStorage.token)) {
      this.store.dispatch(makeIsloggedTrue());
      this.store.dispatch(addUserName());
    }
    if (localStorage.getItem('lang') === 'en') {
      this.translate.use('en');
    } else if (localStorage.getItem('lang') === 'ru') {
      this.translate.use('ru');
    } else {
      this.translate.use('en');
      localStorage.setItem('lang', 'en');
    }
    if (localStorage.getItem('lang') === 'en') {
      this.checked = 'checked';
    } else {
      this.checked = '';
    }
  }

  changeLang(): void {
    if (this.translate.currentLang === 'en') {
      this.translate.use('ru');
      localStorage.setItem('lang', 'ru');
    } else {
      this.translate.use('en');
      localStorage.setItem('lang', 'en');
    }
  }

  logout() {
    this.authService.onLogOut();
    void this.router.navigate([ESiteUrls.welcome]);
  }

  deleteUser() {
    let dialog = this.dialogRef.open(DeletingPopupComponent, {
      data: { name: 'deleting-popup.del-acc' },
      panelClass: 'custom',
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.toString() === 'true') {
        this.apiService.deleteUser(getUserIdFromLs());
        this.authService.onLogOut();
        void this.router.navigate([ESiteUrls.signUp]);
      }
    });
  }

  onLogoClick() {
    this.router.navigate([getTokenFromLS() ? ESiteUrls.boards : ESiteUrls.welcome]);
  }

  createBoard() {
    this.dialogRef.open(CreatingBoardPopupComponent, { panelClass: 'custom' });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
