import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { deleteBoardById } from 'src/app/NgRx/actions/storeActions';
import { MatDialog } from '@angular/material/dialog';
import { DeletingPopupComponent } from '../../../shared/components/deleting-popup/deleting-popup.component';
import { LoaderService } from '../../../shared/components/loader/loader.service';
import { UpdateBoardPopupComponent } from 'src/app/shared/components/update-board-popup/update-board-popup.component';
import { catchError } from 'rxjs';
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
    private readonly loaderService: LoaderService,
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

  deleteBoard(boardId: string) {
    let dialog = this.dialogRef.open(DeletingPopupComponent, {
      data: { name: 'deleting-popup.del-board' },
      panelClass: 'custom',
    });
    dialog.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.apiBoardService
          .deleteBoard(boardId)
          .pipe(
            catchError((err: IHttpErrors) => {
              this.notificationService.showError(ESiteUrls.boards, err);
              throw new Error(`${err.error.statusCode} ${err.error.message}`);
            })
          )
          .subscribe(() => this.store.dispatch(deleteBoardById({ boardId })));
      }
    });
  }
}
