import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MissionCreateComponent } from './components/mission-create/mission-create.component';
import { MissionListComponent } from './components/mission-list/mission-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent },
  { path: 'missions', component: MissionListComponent },
  { path: 'mission/:id', component: MissionCreateComponent },
  { path: 'create', component: MissionCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
