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
import { TaskComponent } from './task/task.component';
import { MatCardModule } from '@angular/material/card';
import { ColumnOrderSortingPipe } from './pipes/column-order-sorting.pipe';
import { TaskOrderSortingPipe } from './pipes/task-order-sorting.pipe';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ColumnsPageComponent, TaskComponent, ColumnOrderSortingPipe, TaskOrderSortingPipe],
  imports: [
    CommonModule,
    MatButtonModule,
    TranslateModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    DragDropModule,
    MatCardModule,
    MatDialogModule,
  ],
  exports: [ColumnsPageComponent],
})
export class ColumnsPageModule {}
