import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ESiteUrls } from './shared/shared.enums';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./welcome/welcome.module').then((a) => a.WelcomeModule),
  },
  {
    path: ESiteUrls.signIn,
    loadChildren: () => import('./auth/pages/login-form/login-form.module').then((m) => m.LoginFormModule),
  },
  {
    path: ESiteUrls.signUp,
    loadChildren: () => import('./auth/pages/reg-form/reg-form.module').then((m) => m.RegFormModule),
  },
  {
    path: ESiteUrls.userEdit,
    loadChildren: () => import('./auth/pages/edit-form/edit-form.module').then((m) => m.EditFormModule),
  },
  {
    path: ESiteUrls.boards,
    loadChildren: () => import('./boards/boards.module').then((m) => m.BoardsModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
