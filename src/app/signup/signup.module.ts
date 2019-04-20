import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SignupRoutingModule} from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ng2-validation';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    CommonModule,
    HttpModule,
    CustomFormsModule,
    FormsModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
