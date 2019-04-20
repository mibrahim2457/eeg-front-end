import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

import * as $ from 'jquery';
import {SimpleGlobal} from 'ng2-simple-global';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'EEG Anomaly Detection System';
  currentUser: any;
  constructor(private simpleGlobal: SimpleGlobal, private router: Router) {
    this.simpleGlobal['showEegLive'] = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  ngOnInit() {
    /*if (this.router.url === '/') {
      this.router.navigate(['/dashboard']);
    }*/
  }

  ngAfterViewInit() {
    $('#live-ecg-chart').css('display', 'none');

    $('#toggle-btn').on('click', function (e) {

      e.preventDefault();

      if ($(window).outerWidth() > 1194) {
        $('nav.side-navbar').toggleClass('shrink');
        $('.page').toggleClass('active');
      } else {
        $('nav.side-navbar').toggleClass('show-sm');
        $('.page').toggleClass('active-sm');
      }
    });
  }

  ngOnDestroy(): void {
  }

}
