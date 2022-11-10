import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getCurrentBoard } from 'src/app/NgRx/actions/storeActions';
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
    this.router.navigate(['boards']);
    this.store.dispatch(getCurrentBoard({ currentBoard: { title: '', description: '', id: '' } }));
  }
}
