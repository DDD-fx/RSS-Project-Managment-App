import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { ColumnsPageComponent } from '../columns/columns-page.component';

const routes: Routes = [
  {
    path: '',
    component: BoardsPageComponent,
  },
  {
    path: ':id',
    component: ColumnsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {}
