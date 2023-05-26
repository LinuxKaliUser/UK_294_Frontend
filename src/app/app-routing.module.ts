import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { PersonDetailComponent } from './pages/person-detail/person-detail.component';
import { AppRoles } from 'src/app.roles';
import { AppAuthGuard } from './guard/app.auth.guard';
import { MealDetailComponent } from './pages/meal-detail/meal-detail.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { TeamDetailComponent } from './pages/team-detail/team-detail.component';

const routes: Routes = [
{path: '', component: DashboardComponent},
{path: 'dashboard', component: DashboardComponent},
{path: 'noaccess', component: NoAccessComponent},
{
  path: 'person', canActivate: [AppAuthGuard], component: PersonDetailComponent, pathMatch: 'full',
  data: {roles: [AppRoles.Admin]}
},
{
  path: 'meal', canActivate: [AppAuthGuard], component: MealDetailComponent, pathMatch: 'full',
  data: {roles: [AppRoles.Admin]}
},
{
  path: 'task', canActivate: [AppAuthGuard], component: TaskDetailComponent, pathMatch: 'full',
  data: {roles: [AppRoles.Admin]}
},
{
  path: 'team', canActivate: [AppAuthGuard], component: TeamDetailComponent, pathMatch: 'full',
  data: {roles: [AppRoles.Admin]}
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
