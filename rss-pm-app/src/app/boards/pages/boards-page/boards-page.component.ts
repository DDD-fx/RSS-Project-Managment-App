import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable, pairwise, throttleTime } from 'rxjs';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { getAllBoards } from 'src/app/NgRx/actions/storeActions';
import { selectAllBoards } from 'src/app/NgRx/selectors/storeSelectors';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit, AfterViewInit {
  constructor(private apiBoardService: ApiBoardService, private store: Store, private ngZone: NgZone) {}

  @ViewChild(CdkVirtualScrollViewport) scroller!: CdkVirtualScrollViewport;

  boards$: Observable<ICreateBoardResp[]> | undefined;

  fetchData() {
    this.apiBoardService.getBoards().subscribe((boards: ICreateBoardResp[]) => {
      this.store.dispatch(getAllBoards({ boards }));
      this.boards$ = this.store.select(selectAllBoards);
    });
  }

  ngOnInit(): void {
    this.fetchData();
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
}
