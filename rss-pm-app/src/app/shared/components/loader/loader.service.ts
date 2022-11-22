import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading$ = new BehaviorSubject(false);

  enableLoader(): void {
    console.log('enable');
    this.isLoading$.next(true);
  }

  disableLoader(): void {
    console.log('disable');
    this.isLoading$.next(false);
  }
}
