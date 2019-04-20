import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user_service/user.service';
import {AlertService} from '../../services/alert_service/alert.service';
import { HistoryService } from './../../services/history.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currPassword: any;
  newPassword: any;
  loading = false;
  isPasswordChanged = false;
  isCurrPassCorrect = true;

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
  }

  changePassword() {
    this.isPasswordChanged = false;
    this.loading = true;
    this.isCurrPassCorrect = true;
    this.userService.updatePassword(
      {
        currPassword: this.currPassword,
        newPassword: this.newPassword
      }).subscribe(
        data => {
          this.alertService.success('Change was successful', true);
          this.isPasswordChanged = true;
          alert('Password Changed Successfully....!');
        },
        error => {
          // this.alertService.error(error);
          console.log(error);
          // alert(error);
          this.isPasswordChanged = false;
          this.loading = false;
          this.isCurrPassCorrect = false;

        });
  }

}
