import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { getAllBoards } from 'src/app/NgRx/actions/storeActions';
import { selectAllBoards } from 'src/app/NgRx/selectors/storeSelectors';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  constructor(private apiBoardService: ApiBoardService, private store: Store) {
    this.apiBoardService.getBoards().subscribe((boards: ICreateBoardResp[]) => {
      this.store.dispatch(getAllBoards({ boards }));
      this.boards$ = this.store.select(selectAllBoards);
    });
  }

  boards$: Observable<ICreateBoardResp[]> | undefined;

  ngOnInit(): void {}
}
