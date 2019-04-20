import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';
import {SimpleGlobal} from 'ng2-simple-global';
import {BusyModule} from 'angular2-busy';
import {Ng2OrderModule} from 'ng2-order-pipe';
// import { LoginComponent } from './login/login.component';
// import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { PouchdbService } from './pouchdb.service';
import {AlertService} from './services/alert_service/alert.service';
import {UserService} from './services/user_service/user.service';
import { HistoryService } from './services/history.service';
import { AlertComponent } from './alert/alert.component';
import {AuthenticationService} from './services/authentication_service/authentication.service';
import {AppRoutingModule} from './app-routing.module';
// import { ZingchartComponent } from './zingchart/zingchart.component';
// import { SmoothiePlotterComponent } from './smoothie-plotter/smoothie-plotter.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { StringSortPipe } from './string-sort.pipe';
import { ResultsGuard } from './shared/guard/results.guard';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    // ZingchartComponent,
    // SmoothiePlotterComponent,
    // DashboardComponent,
    StringSortPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    NgxMyDatePickerModule.forRoot()
  ],
  providers: [SimpleGlobal, AuthGuard, PouchdbService, AlertService, UserService, AuthenticationService, HistoryService, ResultsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
