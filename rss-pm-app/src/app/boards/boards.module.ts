import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardComponent } from './components/board/board.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NewBoardComponent } from './components/new-board/new-board.component';

@NgModule({
  declarations: [BoardComponent, BoardsPageComponent, NewBoardComponent],
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
  ],
})
export class BoardsModule {}
