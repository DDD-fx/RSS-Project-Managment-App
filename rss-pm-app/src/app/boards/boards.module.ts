import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardItemComponent } from './components/board-item/board-item.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NewBoardComponent } from './components/new-board/new-board.component';
import { BoardComponent } from './components/board/board.component';
import { SortPipe } from './pipes/sort.pipe';
import { ColumnsPageModule } from '../columns/columns-page.module';
import { SearchComponent } from './components/search/search.component';
import { PopupSearchResultsComponent } from './components/popup-search-results/popup-search-results.component';
import { LoaderModule } from '../shared/components/loader/loader.module';
import { DeletingPopupModule } from '../shared/components/deleting-popup/deleting-popup.module';
import { CreatingBoardPopupModule } from '../shared/components/creating-board-popup/creating-board-popup.module';
import { UpdateBoardPopupModule } from '../shared/components/update-board-popup/update-board-popup.module';

@NgModule({
  declarations: [
    BoardItemComponent,
    BoardsPageComponent,
    NewBoardComponent,
    BoardComponent,
    SortPipe,
    SearchComponent,
    PopupSearchResultsComponent,
  ],
  imports: [
    CommonModule,
    BoardsRoutingModule,
    LoaderModule,
    ColumnsPageModule,
    DeletingPopupModule,
    CreatingBoardPopupModule,
    UpdateBoardPopupModule,
    MatButtonModule,
    TranslateModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class BoardsModule {}
