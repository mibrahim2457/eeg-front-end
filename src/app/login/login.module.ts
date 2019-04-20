import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {HttpModule} from '@angular/http';
import {CustomFormsModule} from 'ng2-validation';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    HttpModule,
    CustomFormsModule,
    FormsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
 }
