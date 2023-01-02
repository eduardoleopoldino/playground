import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';

export default [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'user',
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: 'create',
        component: UserFormComponent,
      },
      {
        path: 'edit/:id',
        component: UserFormComponent,
      },
    ],
  },
] as Route[];
