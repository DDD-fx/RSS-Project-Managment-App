import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiBoardService } from '../../../api/services/api-board.service';
import { Store } from '@ngrx/store';
import { getAllBoards } from '../../../NgRx/actions/storeActions';
import { LoaderService } from '../loader/loader.service';

export interface DialogData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-creating-board-popup',
  templateUrl: './creating-board-popup.component.html',
  styleUrls: ['./creating-board-popup.component.scss'],
})
export class CreatingBoardPopupComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<CreatingBoardPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly apiBoardService: ApiBoardService,
    private readonly store: Store,
    private readonly loaderService: LoaderService
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  public boardForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    description: new FormControl('', [Validators.required]),
  });

  createBoard() {
    if (this.boardForm.valid) {
      this.loaderService.enableLoader();
      this.apiBoardService.createBoard(this.boardForm.value).subscribe(() => this.store.dispatch(getAllBoards()));
      this.dialogRef.close();
      this.loaderService.disableLoader();
    }
  }
}
