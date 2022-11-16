import { Component, OnInit } from '@angular/core';
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

  constructor(
    private readonly store: Store,
    private readonly apiColumnsService: ApiColumnsService,
    private readonly router: Router,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit() {
    const boardId = this.router.url.split('/').pop();
    if (boardId) {
      this.loaderService.enableLoader();
      this.apiColumnsService
        .getAllColumns(boardId)
        .pipe(map((columns) => columns.sort((a, b) => a.order - b.order)))
        .subscribe((res) => {
          this.columns$.next(res);
        });
    }
    this.loaderService.disableLoader();
  }

  onAddColumn() {
    this.addColumn = true;
  }

  onCancelAddColumn() {
    this.addColumn = false;
  }

  onCreateColumn() {
    const title = this.newColumnForm.controls.columnName.value!;
    const boardId = this.router.url.split('/').pop();
    if (boardId) {
      this.loaderService.enableLoader();
      this.apiColumnsService
        .createNewColumn(boardId, title)
        .pipe(
          switchMap(() => this.apiColumnsService.getAllColumns(boardId)),
          tap((columns) => {
            this.columns$.next(columns);
            this.loaderService.disableLoader();
          })
        )
        .subscribe();
    }
  }

  drop(event: CdkDragDrop<ICreateColumnResp[]>) {
    const columns = this.columns$.value;
    moveItemInArray(columns, event.previousIndex, event.currentIndex);
    this.columns$.next(columns);
    for (let i = 0; i <= columns.length; i += 1) {
      const boardId = this.router.url.split('/').pop();
      if (boardId) {
        const body = {
          title: columns[i].title,
          order: i + 1,
        };
        this.apiColumnsService.updateColumn(boardId, columns[i].id, body).subscribe();
      }
    }
  }
}
