import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegFormComponent } from './reg-form.component';

const routes: Routes = [{ path: '', component: RegFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegFormRoutingModule {}
