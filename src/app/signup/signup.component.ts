import { Component, OnInit } from '@angular/core';
import {UserModel} from '../models/user.model';
import {UserService} from '../services/user_service/user.service';
import {Router} from '@angular/router';
import {AlertService} from '../services/alert_service/alert.service';
import {IMyDateModel, INgxMyDpOptions} from 'ngx-mydatepicker';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userModel: UserModel;
  loading = false;
  duplicate= false;
  // Initialized to specific date (09.10.2018)
  model: any = { date: { year: 2018, month: 10, day: 9 } };
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };

  constructor(private router: Router,
              private userService: UserService,
              private alertService: AlertService) {
    this.userModel = new UserModel;
  }

  ngOnInit() {

    // ------------------------------------------------------- //
    // Transition Placeholders
    // ------------------------------------------------------ //
    $('input').on('focus', function () {
      $(this).siblings('.label-custom').addClass('active');
    });

    $('input').on('blur', function () {
      $(this).siblings('.label-custom').removeClass('active');

      if ($(this).val() !== '') {
        $(this).siblings('.label-custom').addClass('active');
      } else {
        $(this).siblings('.label-custom').removeClass('active');
      }
    });
  }

  register() {
    this.loading = true;
    this.userService.create(this.userModel)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          const user = data;
          if (user.success && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
          this.duplicate = true;
          console.log(error);
          this.loading = false;
        });
  }

  // optional date changed callback
  onDateChanged(event: IMyDateModel): void {
    // date selected
  }

}
