import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatingBoardPopupComponent } from './creating-board-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CreatingBoardPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [CreatingBoardPopupComponent],
})
export class CreatingBoardPopupModule {}
