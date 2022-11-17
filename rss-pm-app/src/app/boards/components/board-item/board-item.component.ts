import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { deleteBoardById, getCurrentBoard, updateBoardSuccess } from 'src/app/NgRx/actions/storeActions';
import { MatDialog } from '@angular/material/dialog';
import { DeletingPopupComponent } from '../../../shared/components/deleting-popup/deleting-popup.component';
import { LoaderService } from '../../../shared/components/loader/loader.service';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent {
  @Input() board!: ICreateBoardResp;

  private customColor: string = '#ffffff';

  public updateForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  isUpdateFormActive = false;

  toggleUpdateForm() {
    this.isUpdateFormActive = !this.isUpdateFormActive;
    this.updateForm.controls['title'].setValue('');
    this.updateForm.controls['description'].setValue('');
    this.updateForm.markAsUntouched();
  }

  constructor(
    private apiBoardService: ApiBoardService,
    private store: Store,
    private dialogRef: MatDialog,
    private readonly loaderService: LoaderService
  ) {}

  onClick(color: string) {
    this.customColor = color;
  }

  saveCurrentBoard() {
    this.loaderService.enableLoader();
    this.store.dispatch(getCurrentBoard({ boardId: this.board.id }));
    this.loaderService.disableLoader();
  }

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

  updateBoard(boardId: string) {
    this.loaderService.enableLoader();
    const board: ICreateBoardResp = {
      id: boardId,
      title: this.updateForm.controls['title'].value,
      description: this.updateForm.controls['description'].value,
    };
    this.store.dispatch(updateBoardSuccess({ board: board }));
    this.apiBoardService.updateBoard(this.updateForm.value, boardId).subscribe();
    this.toggleUpdateForm();
    this.loaderService.disableLoader();
  }
}
