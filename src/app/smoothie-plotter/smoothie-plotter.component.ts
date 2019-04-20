import {Component, ElementRef, Input, NgZone, OnChanges, OnInit} from '@angular/core';
import {SmoothieChart, TimeSeries} from 'smoothie';

@Component({
  selector: 'app-smoothie-plotter',
  templateUrl: './smoothie-plotter.component.html',
  styleUrls: ['./smoothie-plotter.component.css']
})
export class SmoothiePlotterComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() width: number;
  @Input() height: number;
  @Input() incomingData: Array<string>;
  chart: any;
  sineLine: any;
  smoothieOptions: any;
  timeSeriesOptions: any;

  constructor(private element: ElementRef, private ngZone: NgZone) {
    this.smoothieOptions = {
      enableDpiScaling: true,
      maxValueScale: 1.001, minValueScale: 1.001,
      scaleSmoothing: 0.1,
      // minValue: 90, maxValue: 165,
      timestampFormatter: SmoothieChart.timeFormatter,
      responsive: true,
      millisPerPixel: 7,
      grid: {
        fillStyle: '#ffffff',
        strokeStyle: 'rgba(255,0,0,0.45)',
        sharpLines: true,
        verticalSections: 14,
        borderVisible: true,
        millisPerLine: 110
      },
      labels: {fillStyle: '#000000'},
      // limitFPS: 15
    };
    this.timeSeriesOptions = {
      lineWidth: 1,
      strokeStyle: '#000000'
    };

   }

   ngOnInit() {

    this.chart = new SmoothieChart(this.smoothieOptions);
    this.sineLine = new TimeSeries();
    this.chart.streamTo(
      this.element.nativeElement.getElementsByTagName('canvas')[0], 10);
    this.chart.addTimeSeries(this.sineLine, this.timeSeriesOptions);
  }

  ngOnChanges(data) {
    if (data.incomingData) {
      if (data.incomingData.currentValue) {
        this.ngZone.runOutsideAngular(() => {
          const eeg = data.incomingData.currentValue;
          this.sineLine.append(eeg.time, eeg.data);
          console.log(data.incomingData.currentValue);
        });
      }
    }
  }

}
