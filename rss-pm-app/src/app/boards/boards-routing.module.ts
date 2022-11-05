import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';

const routes: Routes = [
  {
    path: '',
    component: BoardsPageComponent,
  },
  {
    path: ':id',
    component: BoardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {}
