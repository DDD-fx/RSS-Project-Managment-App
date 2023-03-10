import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ESiteUrls } from './shared/shared.enums';
import { getTokenFromLS } from './shared/shared.utils';
import { WelcomeGuard } from './core/guards/welcome.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: getTokenFromLS() ? ESiteUrls.boards : ESiteUrls.welcome,
    pathMatch: 'full',
  },
  {
    path: ESiteUrls.welcome,
    loadChildren: () => import('./welcome/welcome.module').then((a) => a.WelcomeModule),
    canActivate: [WelcomeGuard],
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
  {
    path: 'custody',
    loadChildren: () => import('./shared/custody/custody.module').then((m) => m.CustodyModule),
  },
  {
    path: ESiteUrls.p404,
    loadChildren: () => import('./shared/components/page404/page404.module').then((m) => m.Page404Module),
  },
  {
    path: '**',
    loadChildren: () => import('./shared/components/page404/page404.module').then((m) => m.Page404Module),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
