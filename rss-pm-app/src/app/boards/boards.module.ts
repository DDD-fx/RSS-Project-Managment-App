import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardItemComponent } from './components/board-item/board-item.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NewBoardComponent } from './components/new-board/new-board.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BoardComponent } from './components/board/board.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeletingPopupComponent } from '../shared/components/deleting-popup/deleting-popup.component';
import { SortPipe } from './pipes/sort.pipe';
import { ColumnsPageModule } from '../columns/columns-page.module';

@NgModule({
  declarations: [BoardItemComponent, BoardsPageComponent, NewBoardComponent, BoardComponent, SortPipe],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ScrollingModule,
    MatDialogModule,
    ColumnsPageModule,
  ],
  entryComponents: [DeletingPopupComponent],
})
export class BoardsModule {}
