import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiColumnsService } from '../api/services/api-colomns.service';
import { map, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ICreateColumnResp } from '../api/models/api-board.model';
import { LoaderService } from '../shared/components/loader/loader.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskPopupComponent } from '../shared/components/create-task-popup/create-task-popup.component';
import { ColumnsService } from './columns.service';
import { ApiBoardService } from '../api/services/api-board.service';

@Component({
  selector: 'app-columns-page',
  templateUrl: './columns-page.component.html',
  styleUrls: ['./columns-page.component.scss'],
})
export class ColumnsPageComponent implements OnInit {
  public addColumn = false;

  public newColumnForm = new FormGroup({ columnName: new FormControl('', Validators.required) });

  public board$ = this.columnsService.board$;

  public columns$ = this.board$.pipe(map((board) => board.columns));

  private readonly currBoardId = this.columnsService.currBoardId;

  constructor(
    private readonly store: Store,
    private readonly apiColumnsService: ApiColumnsService,
    private readonly router: Router,
    private readonly loaderService: LoaderService,
    private readonly elRef: ElementRef,
    private readonly dialogRef: MatDialog,
    private readonly columnsService: ColumnsService,
    private readonly apiBoardService: ApiBoardService
  ) {}

  ngOnInit() {
    this.loaderService.enableLoader();
    this.apiBoardService
      .getBoard(this.currBoardId)
      .pipe(
        tap((board) => this.columnsService.board$.next(board)),
        tap(() => console.log(this.board$.value)),

        map((board) => ({
          ...board,
          columns: board.columns.sort((a, b) => a.order - b.order),
        })),
        tap((board) => this.columnsService.board$.next(board))
      )
      .subscribe();
    this.loaderService.disableLoader();
  }

  onAddColumn() {
    this.addColumn = true;
    this.elRef.nativeElement.scroll(9999, 0);
  }

  onCancelAddColumn() {
    this.addColumn = false;
  }

  onCreateColumn() {
    const title = this.newColumnForm.controls.columnName.value!;
    this.loaderService.enableLoader();
    this.apiColumnsService
      .createNewColumn(this.currBoardId, title)
      .pipe(
        switchMap(() => this.apiBoardService.getBoard(this.currBoardId)),
        tap((board) => {
          this.columnsService.board$.next(board);
          this.loaderService.disableLoader();
        })
      )
      .subscribe();
  }

  onDeleteColumn(columnId: string) {
    this.loaderService.enableLoader();
    this.apiColumnsService.deleteColumn(this.currBoardId, columnId).subscribe();
    this.apiBoardService
      .getBoard(this.currBoardId)
      .pipe(
        tap((board) => {
          this.columnsService.board$.next(board);
          this.loaderService.disableLoader();
        })
      )
      .subscribe();
  }

  drop(event: CdkDragDrop<ICreateColumnResp[]>) {
    const columns = this.columnsService.board$.value.columns;
    moveItemInArray(columns, event.previousIndex, event.currentIndex);
    const board = this.board$.value;
    this.columnsService.board$.next({ ...board, columns: columns });
    for (let i = 0; i < columns.length; i += 1) {
      const body = {
        title: columns[i].title,
        order: i + 1,
      };
      this.apiColumnsService.updateColumn(this.currBoardId, columns[i].id, body).subscribe();
    }
  }

  createTaskPopup(columnId: string) {
    this.dialogRef.open(CreateTaskPopupComponent, { data: columnId });
  }
}
