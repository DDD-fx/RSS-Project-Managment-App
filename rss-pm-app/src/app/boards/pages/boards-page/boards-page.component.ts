import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { getAllBoards } from 'src/app/NgRx/actions/storeActions';
import { selectAllBoards, selectAllBoardsFailure, selectAllBoardsSuccess } from 'src/app/NgRx/selectors/storeSelectors';
import { ELocalStorage } from 'src/app/shared/shared.enums';
import { LoaderService } from '../../../shared/components/loader/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  isLoadingBoard$: Observable<boolean>;

  boards$: Observable<ICreateBoardResp[] | []>;

  error$: Observable<string | null>;

  isLoading$ = this.loaderService.isLoading$;

  constructor(
    private apiBoardService: ApiBoardService,
    private store: Store,
    private ngZone: NgZone,
    private readonly loaderService: LoaderService
  ) {
    this.isLoadingBoard$ = this.store.select(selectAllBoards);
    this.boards$ = this.store.select(selectAllBoardsSuccess);
    this.error$ = this.store.select(selectAllBoardsFailure);
  }

  @ViewChild(CdkVirtualScrollViewport) scroller!: CdkVirtualScrollViewport;

  order: string = 'asc';

  fetchData() {
    this.store.dispatch(getAllBoards());
  }

  ngOnInit(): void {
    if (localStorage.getItem(ELocalStorage.token)) {
      this.fetchData();
      this.loaderService.disableLoader(); // а где enable?
    }
  }

  sortBoards() {
    if (this.order === 'desc') {
      this.order = 'asc';
    } else {
      this.order = 'desc';
    }
  }
}
