import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentBoard } from 'src/app/NgRx/selectors/storeSelectors';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  public constructor(private store: Store, private router: Router) {}

  board$ = this.store.select(selectCurrentBoard);

  onBack() {
    void this.router.navigate(['boards']);
  }
}
