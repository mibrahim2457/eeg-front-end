import {Component, NgZone, AfterViewInit, OnDestroy, Input} from '@angular/core';
import { ZingChartModel } from '../models/chart.model';
declare var zingchart: any;

@Component({
  selector: 'app-zingchart',
    template: `<div id="{{chart?.id}}"></div>`
})
export class ZingchartComponent implements AfterViewInit, OnDestroy {
  @Input() chart: ZingChartModel;

  constructor(private zone: NgZone) { }

  ngAfterViewInit () {
    this.zone.runOutsideAngular(() => {
      zingchart.render({
        id : this.chart.id,
        data : this.chart.data,
        width : this.chart.width,
        height: this.chart.height
      });
    });
  }

  ngOnDestroy () {
    zingchart.exec(this.chart.id, 'destroy');
  }

}
