import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustodyComponent } from './custody.component';

const routes: Routes = [{ path: '', component: CustodyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustodyRoutingModule {}
