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
import { MatGridListModule } from '@angular/material/grid-list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BoardComponent } from './components/board/board.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { EditBoardComponent } from './components/edit-board/edit-board.component';

@NgModule({
  declarations: [
    BoardItemComponent,
    BoardsPageComponent,
    NewBoardComponent,
    BoardPageComponent,
    BoardComponent,
    EditBoardComponent,
  ],
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
    MatGridListModule,
    ScrollingModule,
  ],
})
export class BoardsModule {}
