import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable, pairwise, throttleTime } from 'rxjs';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { getAllBoards } from 'src/app/NgRx/actions/storeActions';
import { selectAllBoards, selectAllBoardsFailure, selectAllBoardsSuccess } from 'src/app/NgRx/selectors/storeSelectors';
import { ELocalStorage } from 'src/app/shared/shared.enums';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit, AfterViewInit {
  isLoading$: Observable<boolean>;

  boards$: Observable<ICreateBoardResp[] | []>;

  error$: Observable<string | null>;

  constructor(private apiBoardService: ApiBoardService, private store: Store, private ngZone: NgZone) {
    this.isLoading$ = this.store.select(selectAllBoards);
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
    }
  }

  ngAfterViewInit() {
    this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureViewportOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 140),
        throttleTime(200)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.fetchData();
        });
      });
  }

  sortBoards() {
    if (this.order === 'desc') {
      this.order = 'asc';
      console.log(this.order);
    } else {
      this.order = 'desc';
      console.log(this.order);
    }
  }
}
