import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnsPageComponent } from './columns-page.component';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskComponent } from './task/task.component';
import { MatCardModule } from '@angular/material/card';
import { ColumnOrderSortingPipe } from './pipes/column-order-sorting.pipe';
import { TaskOrderSortingPipe } from './pipes/task-order-sorting.pipe';
import { ColumnTitleInputComponent } from './column-title-input/column-title-input.component';
import { DeletingPopupModule } from '../shared/components/deleting-popup/deleting-popup.module';
import { CreateColumnPopupModule } from '../shared/components/create-column-popup/create-column-popup.module';
import { CreateTaskPopupModule } from '../shared/components/create-task-popup/create-task-popup.module';
import { EditTaskPopupModule } from '../shared/components/edit-task-popup/edit-task-popup.module';
import { ColumnsPageHeaderComponent } from './columns-page-header/columns-page-header.component';
import { LoaderModule } from '../shared/components/loader/loader.module';

@NgModule({
  declarations: [
    ColumnsPageComponent,
    TaskComponent,
    ColumnOrderSortingPipe,
    TaskOrderSortingPipe,
    ColumnTitleInputComponent,
    ColumnsPageHeaderComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    DeletingPopupModule,
    CreateColumnPopupModule,
    CreateTaskPopupModule,
    EditTaskPopupModule,
    LoaderModule,
  ],
  exports: [ColumnsPageComponent],
})
export class ColumnsPageModule {}
