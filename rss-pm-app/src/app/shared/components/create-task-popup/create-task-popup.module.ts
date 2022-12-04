import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskPopupComponent } from './create-task-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CreateTaskPopupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [CreateTaskPopupComponent],
})
export class CreateTaskPopupModule {}
