import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateBoardPopupComponent } from './update-board-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [UpdateBoardPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [UpdateBoardPopupComponent],
})
export class UpdateBoardPopupModule {}
