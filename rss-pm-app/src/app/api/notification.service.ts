import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EHttpStatus, ESiteUrls } from '../shared/shared.enums';
import { TranslateService } from '@ngx-translate/core';
import { IHttpErrors } from './models/errors.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private readonly toastr: ToastrService, private readonly translate: TranslateService) {}

  showSuccess(notificationSource: string): void {
    // TODO: заменить на обращение к ngrx
    const currLang = this.translate.currentLang;
    switch (notificationSource) {
      case ESiteUrls.signIn:
        if (currLang === 'en') this.toastr.success('Logged in successfully');
        else this.toastr.success('Успешная авторизация');
        break;

      default:
        this.toastr.success('Success');
    }
  }

  // showInfo(message: string, title: string): void {
  //   this.toastr.info(message, title);
  // }

  showError(notificationSource: string, err: IHttpErrors): void {
    // TODO: заменить на обращение к ngrx
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
          if (currLang === 'en') this.toastr.error('Invalid password', `Error code: ${err.error.statusCode}`);
          else this.toastr.error('Неверный пароль', `Error code: ${err.error.statusCode}`);
        }
        break;

      case ESiteUrls.boards:
        if (currLang === 'en') this.toastr.error('Board was not found!', `Error code: ${err.error.statusCode}`);
        else this.toastr.error('Доска не найдена', `Error code: ${err.error.statusCode}`);
        break;

      default:
        if (currLang === 'en') this.toastr.error('Something went wrong', 'Error');
        else this.toastr.error('Что-то пошло не так', 'Ошибка');
    }
  }
}
