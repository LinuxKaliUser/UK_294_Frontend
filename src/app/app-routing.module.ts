import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { AppLoginComponent } from './components/app-login/app-login.component';

const routes: Routes = [
{path: '', component: DashboardComponent},
{path: 'dashboard', component: DashboardComponent},
{path: 'noaccess', component: NoAccessComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
