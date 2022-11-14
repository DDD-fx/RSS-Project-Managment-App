import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColumnsPageComponent } from './columns-page.component';

const routes: Routes = [{ path: '', component: ColumnsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColumnsPageRoutingModule {}
