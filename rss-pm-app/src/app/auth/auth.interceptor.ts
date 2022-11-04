import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('assets')) {
      if (request.url.includes('users')) {
        const newReq = request.clone({
          url: `${environment.API_URL}/${request.url}`,
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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
