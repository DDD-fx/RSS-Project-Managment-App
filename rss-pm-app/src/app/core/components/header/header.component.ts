/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ApiUserService } from 'src/app/api/services/api-user.service';
import { addUserName, makeIsloggedFalse, makeIsloggedTrue, removeUserName } from 'src/app/NgRx/actions/storeActions';
import { selectIsLogged, selectUserName } from 'src/app/NgRx/selectors/storeSelectors';
import { MatDialog } from '@angular/material/dialog';
import { DeletingPopupComponent } from '../../../shared/components/deleting-popup/deleting-popup.component';
import { ELocalStorage, ESiteUrls } from '../../../shared/shared.enums';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  isLoggedStore$: Observable<boolean> | undefined;

  userName$: Observable<string | null> | undefined;

  constructor(
    private translate: TranslateService,
    private store: Store,
    private router: Router,
    private apiService: ApiUserService,
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
  }

  changeLang(): void {
    if (this.translate.currentLang === 'en') {
      this.translate.use('ru');
    } else {
      this.translate.use('en');
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
    this.store.dispatch(makeIsloggedFalse());
    this.store.dispatch(removeUserName());
  }

  deleteUser() {
    let dialog = this.dialogRef.open(DeletingPopupComponent, { data: { name: 'deleting-popup.del-acc' } });
    dialog.afterClosed().subscribe((result) => {
      if (result.toString() === 'true') {
        this.apiService.deleteUser();
        localStorage.clear();
        this.store.dispatch(makeIsloggedFalse());
        this.store.dispatch(removeUserName());
        void this.router.navigate([ESiteUrls.signUp]);
      }
    });
  }

  onLogoClick() {
    void this.router.navigate(['']);
  }
}
