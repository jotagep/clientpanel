import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [RegisterGuard]},
  { path: 'add-client', component: AddClientComponent, canActivate: [AuthGuard]},
  { path: 'client/:id', component: ClientDetailsComponent, canActivate: [AuthGuard]},
  { path: 'edit-client/:id', component: EditClientComponent, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
