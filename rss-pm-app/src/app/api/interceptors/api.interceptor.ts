import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EApiUrls, ELocalStorage } from '../../shared/shared.enums';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('assets')) {
      if (request.url.includes(EApiUrls.users) || request.url.includes(EApiUrls.boards)) {
        const newReq = request.clone({
          url: `${environment.API_URL}/${request.url}`,
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem(ELocalStorage.token)}`,
          },
        });
        return next.handle(newReq);
      } else {
        const newReq = request.clone({
          url: `${environment.API_URL}/${request.url}`,
        });
        return next.handle(newReq);
      }
    } else return next.handle(request);
  }
}
