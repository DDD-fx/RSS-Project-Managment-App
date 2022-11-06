import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { makeIsloggedFalse, removeUserName } from 'src/app/NgRx/actions/storeActions';
import { selectIsLogged, selectUserName } from 'src/app/NgRx/selectors/storeSelectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isLoggedStore$: Observable<boolean> | undefined;

  userName$: Observable<string | null> | undefined;

  constructor(private translate: TranslateService, private store: Store, private router: Router) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('en');
    translate.use('en');
    this.isLoggedStore$ = this.store.select(selectIsLogged);
    this.userName$ = this.store.select(selectUserName);
  }

  title = 'rss-pm-app';

  changeLang(): void {
    if (this.translate.currentLang === 'en') {
      this.translate.use('ru');
    } else {
      this.translate.use('en');
    }
  }

  logout() {
    localStorage.clear();
    this.store.dispatch(makeIsloggedFalse());
    this.store.dispatch(removeUserName());
  }

  deleteUser() {
    console.log('Удаляем пользователя');
  }

  onLogoClick() {
    this.router.navigate(['']);
  }
}
