import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'login',
    loadComponent: () =>
      import('./home/login/login.component').then((cmp) => cmp.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./home/register/register.component').then(
        (cmp) => cmp.RegisterComponent
      ),
  },

  {
    path: '',
    component: MainComponent,
    loadChildren: () => import('./admin.routes'),
  },

  {
    path: '**',
    loadComponent: () =>
      import('./layout/page-not-found/page-not-found.component').then(
        (cmp) => cmp.PageNotFoundComponent
      ),
  },
];
