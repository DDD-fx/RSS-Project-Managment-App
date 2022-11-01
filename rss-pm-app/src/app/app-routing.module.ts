import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'signIn',
    loadChildren: () => import('./auth/pages/login-form/login-form.module').then((m) => m.LoginFormModule),
  },
  {
    path: 'signUp',
    loadChildren: () => import('./auth/pages/reg-form/reg-form.module').then((m) => m.RegFormModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}