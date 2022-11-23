import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { deleteBoardById, getCurrentBoard } from 'src/app/NgRx/actions/storeActions';
import { MatDialog } from '@angular/material/dialog';
import { DeletingPopupComponent } from '../../../shared/components/deleting-popup/deleting-popup.component';
import { LoaderService } from '../../../shared/components/loader/loader.service';
import { UpdateBoardPopupComponent } from 'src/app/shared/components/update-board-popup/update-board-popup.component';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent {
  @Input() board!: ICreateBoardResp;

  private customColor: string = '#ffffff';

  openUpdateForm() {
    this.dialogRef.open(UpdateBoardPopupComponent, {
      data: { id: this.board.id },
    });
  }

  constructor(
    private apiBoardService: ApiBoardService,
    private store: Store,
    private dialogRef: MatDialog,
    private readonly loaderService: LoaderService
  ) {}

  // saveCurrentBoard() {
  //   this.loaderService.enableLoader();
  //   this.store.dispatch(getCurrentBoard({ boardId: this.board.id }));
  //   this.loaderService.disableLoader();
  // }

  deleteBoard(boardId: string) {
    this.loaderService.enableLoader();
    let dialog = this.dialogRef.open(DeletingPopupComponent, { data: { name: 'deleting-popup.del-board' } });
    dialog.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.apiBoardService.deleteBoard(boardId);
        this.store.dispatch(deleteBoardById({ boardId }));
      }
    });
    this.loaderService.disableLoader();
  }
}
