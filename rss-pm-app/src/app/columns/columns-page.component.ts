import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiColumnsService } from '../api/services/api-colomns.service';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ICreateColumnResp } from '../api/models/api-board.model';
import { LoaderService } from '../shared/components/loader/loader.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-columns-page',
  templateUrl: './columns-page.component.html',
  styleUrls: ['./columns-page.component.scss'],
})
export class ColumnsPageComponent implements OnInit {
  public addColumn = false;

  public newColumnForm = new FormGroup({ columnName: new FormControl('', Validators.required) });

  public columns$ = new BehaviorSubject<ICreateColumnResp[]>([]);

  private readonly currBoardId = this.router.url.split('/').pop()!;

  constructor(
    private readonly store: Store,
    private readonly apiColumnsService: ApiColumnsService,
    private readonly router: Router,
    private readonly loaderService: LoaderService,
    private readonly elRef: ElementRef
  ) {}

  ngOnInit() {
    this.loaderService.enableLoader();
    this.apiColumnsService
      .getAllColumns(this.currBoardId)
      .pipe(map((columns) => columns.sort((a, b) => a.order - b.order)))
      .subscribe((res) => {
        this.columns$.next(res);
      });

    this.loaderService.disableLoader();
  }

  onAddColumn() {
    this.addColumn = true;
    this.elRef.nativeElement.scroll(9999, 0);
  }

  onCancelAddColumn() {
    this.addColumn = false;
  }

  getColumns() {}

  onCreateColumn() {
    const title = this.newColumnForm.controls.columnName.value!;
    this.loaderService.enableLoader();
    this.apiColumnsService
      .createNewColumn(this.currBoardId, title)
      .pipe(
        switchMap(() => this.apiColumnsService.getAllColumns(this.currBoardId!)),
        tap((columns) => {
          this.columns$.next(columns);
          this.loaderService.disableLoader();
        })
      )
      .subscribe();
  }

  onDeleteColumn(columnId: string) {
    this.loaderService.enableLoader();
    this.apiColumnsService.deleteColumn(this.currBoardId, columnId).subscribe();
    this.apiColumnsService
      .getAllColumns(this.currBoardId!)
      .pipe(
        tap((columns) => {
          this.columns$.next(columns);
          this.loaderService.disableLoader();
        })
      )
      .subscribe();
  }

  drop(event: CdkDragDrop<ICreateColumnResp[]>) {
    const columns = this.columns$.value;
    moveItemInArray(columns, event.previousIndex, event.currentIndex);
    this.columns$.next(columns);
    for (let i = 0; i <= columns.length; i += 1) {
      const body = {
        title: columns[i].title,
        order: i + 1,
      };
      this.apiColumnsService.updateColumn(this.currBoardId, columns[i].id, body).subscribe();
    }
  }
}
