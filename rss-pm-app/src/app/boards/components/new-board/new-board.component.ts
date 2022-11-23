import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiBoardService } from 'src/app/api/services/api-board.service';
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

  constructor(private apiBoardService: ApiBoardService, private store: Store, private dialogRef: MatDialog) {}
}
