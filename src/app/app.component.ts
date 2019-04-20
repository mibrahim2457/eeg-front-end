import {AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SimpleGlobal} from 'ng2-simple-global';
import { NgForm } from '@angular/forms';
import { Session } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(public router: Router, private simpleGlobal: SimpleGlobal) {
    this.simpleGlobal['SERVER_HOST'] = 'http://localhost:3000';
    this.simpleGlobal['SERVER_HOST_WS'] = 'ws://localhost:3000';
    console.log('New URL:    ' + this.router.url);

    this.router.navigate(['login']);

  }

  ngOnInit() {
  }

}
