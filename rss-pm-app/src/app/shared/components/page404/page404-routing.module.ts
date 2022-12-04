import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrongAddressPageComponent } from './page404.component';

const routes: Routes = [{ path: '', component: WrongAddressPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Page404RoutingModule {}
