import { CommonModule } from '@angular/common';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {UserDataFormComponent} from './user-data-form/user-data-form.component';
import {ResultsComponent} from './results/results.component';
import {SettingsComponent} from './settings/settings.component';
import {HistoryComponent} from './history/history.component';
import {ResultsGuard} from '../shared/guard/results.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent,
    children: [
      { path: '', component: UserDataFormComponent },
      { path: 'dashboard', component: UserDataFormComponent },
      { path: 'results', component: ResultsComponent, canActivate: [ResultsGuard]},
      {path: 'history', component: HistoryComponent},
      {path: 'settings', component: SettingsComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class DashboardRoutingModule { }
