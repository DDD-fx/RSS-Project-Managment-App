import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EHttpStatus, ESiteUrls } from '../shared/shared.enums';
import { TranslateService } from '@ngx-translate/core';
import { IHttpErrors } from './models/errors.model';
import { LoaderService } from '../shared/components/loader/loader.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService,
    private readonly loaderService: LoaderService,
    private readonly router: Router
  ) {}

  showSuccess(notificationSource: string): void {
    const currLang = this.translate.currentLang;
    switch (notificationSource) {
      case ESiteUrls.signIn:
        if (currLang === 'en') this.toastr.success('Logged in successfully');
        else this.toastr.success('Успешная авторизация');
        break;

      case ESiteUrls.userEdit:
        if (currLang === 'en') this.toastr.success('Your profile was updated');
        else this.toastr.success('Данные профиля успешно обновлены');
        break;

      default:
        this.toastr.success('Success');
    }
  }

  showError(notificationSource: string, err: IHttpErrors): void {
    const currLang = this.translate.currentLang;
    switch (notificationSource) {
      case ESiteUrls.signIn:
        if (currLang === 'en')
          this.toastr.error(
            'Wrong login or password. Or user with such login does not exist',
            `Error code: ${err.error.statusCode}`
          );
        else
          this.toastr.error(
            'Неверное имя пользователя или пароль. Или пользователя с таким логином не существует',
            `Error code: ${err.error.statusCode}`
          );
        break;

      case ESiteUrls.signUp:
        if (currLang === 'en') this.toastr.error('User login already exists!', `Error code: ${err.error.statusCode}`);
        else this.toastr.error('Пользователь с данным логином уже существует', `Error code: ${err.error.statusCode}`);
        break;

      case ESiteUrls.userEdit:
        if (err.error.statusCode === EHttpStatus.Forbidden) {
          if (currLang === 'en') this.toastr.error('Wrong password', `Error code: ${err.error.statusCode}`);
          else this.toastr.error('Неверный пароль', `Error code: ${err.error.statusCode}`);
        } else if (err.error.statusCode === EHttpStatus.InternalServerError) {
          if (currLang === 'en') this.toastr.error('User login already exists!', `Error code: ${err.error.statusCode}`);
          else this.toastr.error('Пользователь с данным логином уже существует', `Error code: ${err.error.statusCode}`);
        }
        break;

      case ESiteUrls.boards:
        if (currLang === 'en') this.toastr.error('Board was not found!', `Error code: ${err.error.statusCode}`);
        else this.toastr.error('Доска не найдена', `Error code: ${err.error.statusCode}`);
        break;

      //TODO добавить ошибки
      case ESiteUrls.columns:
        if (err.error.statusCode === EHttpStatus.InternalServerError) {
          if (currLang === 'en') this.toastr.error('Bad request', `Error code: ${err.error.statusCode}`);
          else this.toastr.error('Неверный запрос', `Error code: ${err.error.statusCode}`);
          void this.router.navigate(['**']);
        }
        break;

      default:
        if (currLang === 'en') this.toastr.error('Something went wrong', 'Error');
        else this.toastr.error('Что-то пошло не так', 'Ошибка');
        break;
    }
    this.loaderService.disableLoader();
  }
}
