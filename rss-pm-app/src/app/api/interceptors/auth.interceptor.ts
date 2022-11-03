import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('assets')) {
      console.log(request);
      const newReq = request.clone({
        url: `${environment.API_URL}/${request.url}`,
      });
      return next.handle(newReq);
    } else return next.handle(request);
  }
}