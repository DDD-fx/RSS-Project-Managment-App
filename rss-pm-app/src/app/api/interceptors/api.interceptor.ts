import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EApiUrls, ELocalStorage } from '../../shared/shared.enums';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('assets')) {
      if (request.url.includes(EApiUrls.users) || request.url.includes(EApiUrls.boards)) {
        const newReq = request.clone({
          url: `${environment.API_URL}/${request.url}`,
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem(ELocalStorage.token)}`,
          },
        });
        return next.handle(newReq).pipe(
          tap(
            () => {},
            (err: any) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status !== 401) {
                  return;
                }
                this.router.navigate(['']);
                this.authService.onLogOut();
              }
            }
          )
        );
      } else {
        const newReq = request.clone({
          url: `${environment.API_URL}/${request.url}`,
        });
        return next.handle(newReq);
      }
    } else return next.handle(request);
  }
}
