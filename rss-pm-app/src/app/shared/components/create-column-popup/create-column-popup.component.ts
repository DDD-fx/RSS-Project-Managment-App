import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColumnsService } from '../../../columns/columns.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICreateColumnReq } from '../../../api/models/api-board.model';

@Component({
  selector: 'app-create-column-popup',
  templateUrl: './create-column-popup.component.html',
  styleUrls: ['./create-column-popup.component.scss'],
})
export class CreateColumnPopupComponent {
  constructor(
    private dialogRef: MatDialogRef<CreateColumnPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private readonly columnsService: ColumnsService
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  public newColumnForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  createNewColumn(): void {
    const body: ICreateColumnReq = {
      title: this.newColumnForm.controls['title'].value,
    };
    this.columnsService.createNewColumn(body);
    this.dialogRef.close();
  }
}
