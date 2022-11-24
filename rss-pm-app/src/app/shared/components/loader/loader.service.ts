import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading$ = new BehaviorSubject(false);

  isTransparent$ = new BehaviorSubject(false);

  enableLoader(isTransparent = false): void {
    if (isTransparent) this.isTransparent$.next(isTransparent);
    this.isLoading$.next(true);
  }

  disableLoader(): void {
    this.isLoading$.next(false);
  }
}
