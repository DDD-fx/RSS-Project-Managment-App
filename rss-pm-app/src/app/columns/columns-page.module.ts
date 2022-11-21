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
import { EditTaskPopupComponent } from '../shared/components/edit-task-popup/edit-task-popup.component';
import { CreateTaskPopupComponent } from '../shared/components/create-task-popup/create-task-popup.component';
import { CreateColumnPopupComponent } from '../shared/components/create-column-popup/create-column-popup.component';

@NgModule({
  declarations: [
    ColumnsPageComponent,
    TaskComponent,
    ColumnOrderSortingPipe,
    TaskOrderSortingPipe,
    EditTaskPopupComponent,
    CreateTaskPopupComponent,
    CreateColumnPopupComponent,
  ],
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
    // MatDialogModule, // вроде не нужно
  ],
  exports: [ColumnsPageComponent],
})
export class ColumnsPageModule {}
