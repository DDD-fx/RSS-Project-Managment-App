import { Component } from '@angular/core';
import { CreatingBoardPopupComponent } from '../../../shared/components/creating-board-popup/creating-board-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss'],
})
export class NewBoardComponent {
  toggleForm() {
    this.dialogRef.open(CreatingBoardPopupComponent, { panelClass: 'custom' });
  }

  constructor(private readonly dialogRef: MatDialog) {}
}
