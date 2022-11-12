import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deleting-popup',
  templateUrl: './deleting-popup.component.html',
  styleUrls: ['./deleting-popup.component.scss'],
})
export class DeletingPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeletingPopupComponent>) {}
}
