import { Component, OnInit } from '@angular/core';
import {Page} from '../../models/ngx-datatables/page';
import {HistoryService} from '../../services/history.service';
import {element} from 'protractor';
import {Router} from '@angular/router';
import {SimpleGlobal} from 'ng2-simple-global';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  page = new Page();
  rows = [];
  isLoading = false;
  results: any = {};

  constructor(private historyService: HistoryService,
              private simpleGlobal: SimpleGlobal,
              private router: Router) {
    this.page.pageNumber = 0;
    this.page.size = 10;

  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo) {
    this.isLoading = true;
    this.page.pageNumber = pageInfo.offset;
    this.historyService.getAll(this.page).subscribe(pagedData => {
      this.page.totalElements = pagedData.total;
      this.page.totalPages = pagedData.total / this.page.size;
      console.log(pagedData.docs);
      this.rows = [];
      pagedData.docs.forEach(element => {
        element.recordId = element._id;
        this.rows.push(element);
      });
      this.isLoading = false;

    });

  }

  showDetail(recordId: any): boolean {
    this.historyService.getResult(recordId).subscribe(
      results => {
      console.log(results);
      localStorage.setItem('results', JSON.stringify(results));
      this.router.navigate(['/results']);
      console.log('Inside Show Details.....');

    },
      error => {
        console.log(error);
      });
    return false;
  }

  downloadSignalFile(file: any): boolean {
    window.open(this.simpleGlobal['SERVER_HOST'] + '/history/data/recordings/' + file, '_blank');
    return false;

  }

}
