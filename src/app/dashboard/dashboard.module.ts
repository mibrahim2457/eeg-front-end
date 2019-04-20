import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {UserDataFormComponent} from './user-data-form/user-data-form.component';
import {ResultsComponent} from './results/results.component';
import {SmoothiePlotterComponent} from '../smoothie-plotter/smoothie-plotter.component';
import {ZingchartComponent} from '../zingchart/zingchart.component';
import {StringSortPipe} from '../string-sort.pipe';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {BusyModule} from 'angular2-busy';
import {Ng2FileRequiredModule} from 'ng2-file-required';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';
import {ChartsModule} from 'ng2-charts';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {PouchdbService} from '../pouchdb.service';
import {FileUploadModule} from 'ng2-file-upload';
import {SettingsComponent} from './settings/settings.component';
import { HistoryComponent } from './history/history.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {HistoryService} from '../services/history.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
    CustomFormsModule,
    Ng2FileRequiredModule,
    BusyModule,
    Ng2OrderModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxDatatableModule
  ],
  declarations: [
    DashboardComponent,
    UserDataFormComponent,
    ResultsComponent,
    SmoothiePlotterComponent,
    ZingchartComponent,
    SettingsComponent,
    HistoryComponent]
})
export class DashboardModule { }
