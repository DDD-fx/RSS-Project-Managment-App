import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnsPageComponent } from './columns-page.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ColumnsPageComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    TranslateModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    DragDropModule,
  ],
  exports: [ColumnsPageComponent],
})
export class ColumnsPageModule {}
