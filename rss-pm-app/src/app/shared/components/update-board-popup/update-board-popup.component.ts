import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ICreateBoardResp } from 'src/app/api/models/api-board.model';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
import { updateBoardSuccess } from 'src/app/NgRx/actions/storeActions';
import { catchError } from 'rxjs';
import { IHttpErrors } from '../../../api/models/errors.model';
import { ESiteUrls } from '../../shared.enums';
import { NotificationService } from '../../../api/notification.service';

export interface DialogData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-update-board-popup',
  templateUrl: './update-board-popup.component.html',
  styleUrls: ['./update-board-popup.component.scss'],
})
export class UpdateBoardPopupComponent implements OnInit {
  @Input() board!: ICreateBoardResp;

  constructor(
    private readonly apiBoardService: ApiBoardService,
    private readonly store: Store,
    private readonly dialogRef: MatDialogRef<UpdateBoardPopupComponent>,
    private readonly notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: { currBoard: ICreateBoardResp }
  ) {}

  ngOnInit(): void {
    this.updateForm.setValue({
      title: this.data.currBoard.title,
      description: this.data.currBoard.description,
    });
  }

  public updateForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    description: new FormControl('', [Validators.required]),
  });

  closeUpdateForm() {
    this.dialogRef.close();
  }

  updateBoard() {
    if (
      this.updateForm.get('title')?.value !== this.data.currBoard.title ||
      this.updateForm.get('description')?.value !== this.data.currBoard.description
    ) {
      const board: ICreateBoardResp = {
        id: this.data.currBoard.id,
        title: this.updateForm.controls['title'].value,
        description: this.updateForm.controls['description'].value,
      };
      this.store.dispatch(updateBoardSuccess({ board: board }));
      this.apiBoardService
        .updateBoard(this.updateForm.value, this.data.currBoard.id)
        .pipe(
          catchError((err: IHttpErrors) => {
            this.notificationService.showError(ESiteUrls.boards, err);
            throw new Error(`${err.error.statusCode} ${err.error.message}`);
          })
        )
        .subscribe();
    }
    this.dialogRef.close();
  }
}
