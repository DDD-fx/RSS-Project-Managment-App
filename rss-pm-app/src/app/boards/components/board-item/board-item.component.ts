import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { deleteBoardById } from 'src/app/NgRx/actions/storeActions';
import { MatDialog } from '@angular/material/dialog';
import { DeletingPopupComponent } from '../../../shared/components/deleting-popup/deleting-popup.component';
import { UpdateBoardPopupComponent } from 'src/app/shared/components/update-board-popup/update-board-popup.component';
import { catchError, filter, switchMap, tap } from 'rxjs';
import { IHttpErrors } from '../../../api/models/errors.model';
import { ESiteUrls } from '../../../shared/shared.enums';
import { NotificationService } from '../../../api/notification.service';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent {
  @Input() board!: ICreateBoardResp;

  constructor(
    private readonly apiBoardService: ApiBoardService,
    private readonly store: Store,
    private readonly dialogRef: MatDialog,
    private readonly notificationService: NotificationService
  ) {}

  openUpdateForm() {
    const currBoard = this.board;
    this.dialogRef.open(UpdateBoardPopupComponent, {
      data: {
        currBoard,
      },
      panelClass: 'custom',
    });
  }

  requestBoardDeletion(boardId: string) {
    let dialog = this.dialogRef.open(DeletingPopupComponent, {
      data: { name: 'deleting-popup.del-board' },
      panelClass: 'custom',
    });
    dialog
      .afterClosed()
      .pipe(
        filter((result) => result),
        switchMap(() => this.deleteBoard(boardId))
      )
      .subscribe();
  }

  deleteBoard(boardId: string) {
    return this.apiBoardService.deleteBoard(boardId).pipe(
      tap(() => this.store.dispatch(deleteBoardById({ boardId }))),
      catchError((err: IHttpErrors) => {
        this.notificationService.showError(ESiteUrls.boards, err);
        throw new Error(`${err.error.statusCode} ${err.error.message}`);
      })
    );
  }
}
