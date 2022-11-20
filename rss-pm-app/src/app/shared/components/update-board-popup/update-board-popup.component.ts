import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { updateBoardSuccess } from 'src/app/NgRx/actions/storeActions';

export interface DialogData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-update-board-popup',
  templateUrl: './update-board-popup.component.html',
  styleUrls: ['./update-board-popup.component.scss'],
})
export class UpdateBoardPopupComponent {
  @Input() board!: ICreateBoardResp;

  constructor(
    private apiBoardService: ApiBoardService,
    private store: Store,
    private dialogRef: MatDialogRef<UpdateBoardPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {}

  public updateForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  });

  closeUpdateForm() {
    this.dialogRef.close();
    // this.loaderService.disableLoader();
  }

  updateBoard() {
    const board: ICreateBoardResp = {
      id: this.data.id,
      title: this.updateForm.controls['title'].value,
      description: this.updateForm.controls['description'].value,
    };
    this.store.dispatch(updateBoardSuccess({ board: board }));
    this.apiBoardService.updateBoard(this.updateForm.value, this.data.id).subscribe();
    this.dialogRef.close();
  }
}
