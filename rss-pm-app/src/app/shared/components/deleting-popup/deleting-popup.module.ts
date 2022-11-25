import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletingPopupComponent } from './deleting-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DeletingPopupComponent],
  imports: [CommonModule, MatDialogModule, TranslateModule, MatButtonModule],
  exports: [DeletingPopupComponent],
})
export class DeletingPopupModule {}
