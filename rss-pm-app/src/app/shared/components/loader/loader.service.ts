import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading$ = new BehaviorSubject(false);

  toggleIsLoading(): void {
    this.isLoading$.next(!this.isLoading$.value);
  }
}
