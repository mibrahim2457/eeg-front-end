import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication_service/authentication.service';
import {AlertService} from '../services/alert_service/alert.service';

import * as $ from 'jquery';
import { error } from 'util';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  isPasswordCorrect = true;
  isUserFound = true;
  isSubmitted = false;
  recover_Email: any;
  recover_Username: any;
  isEmailSent = false;
  isSending = false;
  isEmailSendingError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {}

  ngOnInit() {
     // $('#recoverFormContent').hide();
     this.initJquery();
     // reset login status
     this.authenticationService.logout();

     // get return url from route parameters or default to '/'
     // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  initJquery(): void {

    // ------------------------------------------------------- //
    // Transition Placeholders
    // ------------------------------------------------------ //
    $(document).on('focus', 'input',  function () {
      $(this).siblings('.label-custom').addClass('active');
    });

    $(document).on('blur', 'input', function () {
      $(this).siblings('.label-custom').removeClass('active');

      if ($(this).val() !== '') {
        $(this).siblings('.label-custom').addClass('active');
      } else {
        $(this).siblings('.label-custom').removeClass('active');
      }
    });
  }

  login() {
    this.isSubmitted = true;
    this.loading = true;
    this.isUserFound = true;
    this.isPasswordCorrect = true;
    this.authenticationService.login(this.model.userEmail, this.model.userPassword)
      .subscribe(
        data => {
          // console.log(data);
          console.log('URL:   ' + this.router.url);
          this.router.navigate(['dashboard']);
        },
        error => {
          alert(error);
          this.alertService.error(error);
          this.loading = false;
          error = JSON.parse(error._body);
          console.log(error);
          if (!error.isUserFound) {
            this.isUserFound = error.isUserFound;
          } else if (!error.isPasswordCorrect) {
            this.isPasswordCorrect = error.isPasswordCorrect;
          }
        });
  }

  recover() {
    this.isEmailSendingError = false;
    this.isSubmitted = true;
    this.isSending = true;
    this.isUserFound = true;
    this.isPasswordCorrect = true;
    this.authenticationService.recover(this.recover_Email)
      .subscribe(
        data => {
          this.isSending = false;
          console.log(data);
          if (data.success) {
            this.isEmailSent = true;
            alert(this.recover_Email);
          }

        },
        error => {
          error = JSON.parse(error._body);
          console.log(error);
          if (!error.isUserFound) {
            this.isUserFound = false;
          } else {
            this.isEmailSendingError = true;
          }

          this.alertService.error(error);
          this.isSending = false;
        });
  }

}
