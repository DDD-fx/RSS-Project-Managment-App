/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { catchError, Observable } from 'rxjs';
import { ApiUserService } from 'src/app/api/services/api-user.service';
import { addUserName, makeIsloggedTrue } from 'src/app/NgRx/actions/storeActions';
import { selectIsLogged, selectUserName } from 'src/app/NgRx/selectors/storeSelectors';
import { MatDialog } from '@angular/material/dialog';
import { DeletingPopupComponent } from '../../../shared/components/deleting-popup/deleting-popup.component';
import { ELocalStorage, ESiteUrls } from '../../../shared/shared.enums';
import { CreatingBoardPopupComponent } from '../../../shared/components/creating-board-popup/creating-board-popup.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { getTokenFromLS, getUserIdFromLs } from 'src/app/shared/shared.utils';
import { IHttpErrors } from '../../../api/models/errors.model';
import { NotificationService } from '../../../api/notification.service';
import { LoaderService } from '../../../shared/components/loader/loader.service';

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
    private readonly translate: TranslateService,
    private readonly store: Store,
    private readonly router: Router,
    private readonly apiService: ApiUserService,
    private readonly authService: AuthService,
    private readonly dialogRef: MatDialog,
    private readonly notificationService: NotificationService,
    private readonly loaderService: LoaderService
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
        this.loaderService.enableLoader();
        this.apiService
          .deleteUser(getUserIdFromLs())
          .pipe(
            catchError((err: IHttpErrors) => {
              this.notificationService.showError(ESiteUrls.boards, err);
              throw new Error(`${err.error.statusCode} ${err.error.message}`);
            })
          )
          .subscribe(() => {
            this.authService.onLogOut();
            void this.router.navigate([ESiteUrls.signUp]);
            this.loaderService.disableLoader();
          });
      }
    });
  }

  onLogoClick() {
    void this.router.navigate([getTokenFromLS() ? ESiteUrls.boards : ESiteUrls.welcome]);
  }

  createBoard() {
    this.dialogRef.open(CreatingBoardPopupComponent, { panelClass: 'custom' });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
