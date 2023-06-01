import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import PersonDetailComponent from './pages/person-detail/person-detail.component';
import { AppRoles } from 'src/app.roles';
import { AppAuthGuard } from './guard/app.auth.guard';

import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { TeamDetailComponent } from './pages/team-detail/team-detail.component';
import { PersonListComponent } from './pages/person-list/person-list.component';

import { TaskListComponent } from './pages/task-list/task-list.component';
import { TeamListComponent } from './pages/team-list/team-list.component';
import { MealDetailComponent } from './pages/meal-detail/meal-detail.component';
import  MealListComponent  from './pages/meal-list/meal-list.component';

const routes: Routes = [
{path: '', component: DashboardComponent},
{path: 'dashboard', component: DashboardComponent},
{path: 'noaccess', component: NoAccessComponent},
{
  path: 'persons', canActivate: [AppAuthGuard], component: PersonListComponent, pathMatch: 'full',
  data: {roles: [AppRoles.Admin]}
},
{
  path: 'person', canActivate: [AppAuthGuard], component: PersonDetailComponent, pathMatch: 'full',
  data: {roles: [AppRoles.Admin]}
},
{
  path: 'person/:id', canActivate: [AppAuthGuard], component: PersonDetailComponent, pathMatch: 'full',
  data: {roles: [AppRoles.Admin]}
},
{
  path: 'meals', canActivate: [AppAuthGuard], component: MealListComponent, pathMatch: 'full',
  data: {roles: [AppRoles.Admin]}
},
{
  path: 'meal/:id', canActivate: [AppAuthGuard], component: MealDetailComponent, pathMatch: 'full',
  data: {roles: [AppRoles.Admin]}
},
{
  path: 'tasks', canActivate: [AppAuthGuard], component: TaskListComponent, pathMatch: 'full',
  data: {roles: [AppRoles.Admin]}
},
{
  path: 'task/:id', canActivate: [AppAuthGuard], component: TaskDetailComponent, pathMatch: 'full',
  data: {roles: [AppRoles.Admin]}
},
{
  path: 'teams', canActivate: [AppAuthGuard], component: TeamListComponent, pathMatch: 'full',
  data: {roles: [AppRoles.Admin]}
},
{
  path: 'team/:id', canActivate: [AppAuthGuard], component: TeamDetailComponent, pathMatch: 'full',
  data: {roles: [AppRoles.Admin]}
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
