import { Component, OnInit } from '@angular/core';
import {ZingChartModel} from '../../models/chart.model';
import {SimpleGlobal} from 'ng2-simple-global';
import {Router} from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  raw_eeg: ZingChartModel;
  filter_eeg: ZingChartModel;

  results: any= {};
  featured_eeg1: ZingChartModel;
  featured_eeg2: ZingChartModel;
  featured_eeg3: ZingChartModel;
  featured_eeg4: ZingChartModel;
  featured_eeg5: ZingChartModel;
  constructor (private router: Router, private simplGlobal: SimpleGlobal) {

    this.results = JSON.parse(localStorage.getItem('results'));
    this.simplGlobal['isLoading'] = false;

  }

  ngOnInit() {
    if (!localStorage.getItem('results')) {
      this.router.navigate(['/']);

    }
    this.raw_eeg = {
      id : 'chart-1',
      data : {
        type: 'line',
        backgroundColor: 'white',
        marginBottom: '10px',
        title: {
          text: 'Raw EEG',
        },
        legend: {
          layout: 'h',
          align: 'center',
          backgroundColor: 'none',
          borderWidth: 0,
          verticalAlign: 'top',
          adjustLayout: true,
          marginTop: '15%',
          visible: false
        },
        series: [  // Insert your series data here.
          {
            values: this.results.raw_eeg,
            text: 'EEG',
            'marker': {
              /* Marker object */
              'background-color': '#6666FF', /* hexadecimal or RGB value */
              'size': 0, /* in pixels */
              'border-color': '#6666FF', /* hexadecimal or RBG value */
              'border-width': 0 /* in pixels */
            },
            'line-color': '#6666FF', /* hexadecimal or RGB value */
            'line-style': 'solid', /* "solid" | "dotted" */
            'line-width': 2 /* in pixels */
          }],
        plotarea: {
          adjustLayout: 1,
          width: '100%',
          margin: 'dynamic',
          marginTop: '5%',
          marginBottom: '10%'
        },
        plot: {
          lineWidth: 2,
          shadow: 0,
          exact: true,
          preview: true,
          'tooltip': {
            'visible': false
          }
        },
        preview: {
          visible: true,
          height: 40,
          adjustLayout: true
        },
        'scroll-y': {
          'handle': {
            'background-color': '#000000',
            'alpha': 0.2,
            'border-radius': '10px',
            'height': '10px'
          }
        },
        'scroll-x': {
          'handle': {
            'background-color': '#000000',
            'alpha': 1,
            'border-radius': '10px',
            'height': '10px'
          }
        },
        scaleX: {
          format: '%v',
          zooming: true,
          'zoom-to': [0, (this.results.raw_eeg.length * 0.5)],
          label: {
            text: 'Samples',
            marginTop: 100
          },
          item: {
            autoAlign: true,
            maxChars: 10
          },
          tick: {
            lineColor: 'black',
            lineWidth: '2px',
            size: 8
          }
        },
        crosshairX: {
          plotLabel: {
            borderWidth: 3,
            borderRadius: 5,
            borderColor: 'gray',
            backgroundColor: '#fff',
            width: 100,
            'plot-label': {
              'text': 'The %t Series has a value of %v.'
            }
          }
        },
        scaleY: {
          zooming: true,
          decimals: 0,
          minValue: Math.min(this.results.raw_eeg),
          maxValue: Math.max(this.results.raw_eeg),
          label: {
            text: 'Amplitude',
            // marginTop: 100
          }
        }
      },
      height : null,
      width : null
    };
    this.filter_eeg = {
      id : 'chart-2',
      data : {
        type: 'line',
        backgroundColor: 'white',
        marginBottom: '10px',
        title: {
          text: 'Processed EEG',
        },
        legend: {
          layout: 'h',
          align: 'center',
          backgroundColor: 'none',
          borderWidth: 0,
          verticalAlign: 'top',
          adjustLayout: true,
          marginTop: '15%',
          visible: false
        },
        series: [  // Insert your series data here.
          {
            values: this.results.filter_signal,
            'marker': {
              /* Marker object */
              'background-color': '#6666FF', /* hexadecimal or RGB value */
              'size': 0, /* in pixels */
              'border-color': '#6666FF', /* hexadecimal or RBG value */
              'border-width': 0 /* in pixels */
            },
            'line-color': '#6666FF', /* hexadecimal or RGB value */
            'line-style': 'solid', /* "solid" | "dotted" */
            'line-width': 2 /* in pixels */
          }],
        plotarea: {
          adjustLayout: 1,
          width: '100%',
          margin: 'dynamic',
          marginTop: '5%',
          marginBottom: '10%'
        },
        plot: {
          lineWidth: 2,
          shadow: 0,
          exact: true,
          preview: true
        },
        preview: {
          visible: true,
          height: 40,
          adjustLayout: true
        },
        'scroll-y': {
          'handle': {
            'background-color': '#000000',
            'alpha': 0.2,
            'border-radius': '10px',
            'height': '10px' // scroll-x only
          }
        },
        'scroll-x': {
          'handle': {
            'background-color': '#000000',
            'alpha': 1,
            'border-radius': '10px',
            'height': '10px' // scroll-x only
          }
        },
        scaleX: {
          format: '%v',
          zooming: true,
          'zoom-to': [0, (this.results.filter_signal.length * 0.25)],
          label: {
            text: 'Samples',
            marginTop: 100
          },
          item: {
            autoAlign: true,
            maxChars: 10
          },
          tick: {
            lineColor: 'black',
            lineWidth: '2px',
            size: 8
          }
        },
        crosshairX: {
          plotLabel: {
            borderWidth: 3,
            borderRadius: 5,
            borderColor: 'gray',
            backgroundColor: '#fff',
            width: 100
          }
        },
        scaleY: {
          zooming: true,
          minValue: Math.min(this.results.filter_signal),
          maxValue: Math.max(this.results.filter_signal),
          decimals: 0,
          label: {
            text: 'Amplitude',
            // marginTop: 100
          }
        }
      },
      height : null,
      width : null
    };

    const theta = [];
    for (let i = 0; i < this.results.theta.length; i++) {
      theta.push([i, this.results.theta[i]]);
    }
    const alpha_low = [];
    for (let i = 0; i < this.results.alpha_low.length; i++) {
      alpha_low.push([i, this.results.alpha_low[i]]);
    }
    const alpha_high = [];
    for (let i = 0; i < this.results.alpha_high.length; i++) {
      alpha_high.push([i, this.results.alpha_high[i]]);
    }
    const beta = [];
    for (let i = 0; i < this.results.beta.length; i++) {
      beta.push([i, this.results.beta[i]]);
    }
    const gamma = [];
    for (let i = 0; i < this.results.gamma.length; i++) {
      gamma.push([i, this.results.gamma[i]]);
    }

    const d = [];
    for (let i = 0; i < this.results.filter_signal.length; i++) {
      d.push([i, this.results.filter_signal[i]]);
    }

    this.featured_eeg1 = {
      id : 'chart-3',
      data : {
        type: 'line',
        backgroundColor: 'white',
        marginBottom: '10px',
        title: {
          text: 'Theta Rhythm (4-7 Hz)',
        },
        legend: {
          layout: 'h',
          align: 'center',
          backgroundColor: 'none',
          borderWidth: 0,
          verticalAlign: 'top',
          adjustLayout: true,
          marginTop: '15%',
          visible: false
        },
        series: [  // Insert your series data here.
          {
            values: theta,
            'marker': {
              /* Marker object */
              'background-color': '#6666FF', /* hexadecimal or RGB value */
              'size': 0, /* in pixels */
              'border-color': '#6666FF', /* hexadecimal or RBG value */
              'border-width': 0 /* in pixels */
            },
            'line-color': '#6666FF', /* hexadecimal or RGB value */
            'line-style': 'solid', /* "solid" | "dotted" */
            'line-width': 2 /* in pixels */
          }],
        plotarea: {
          adjustLayout: 1,
          width: '100%',
          margin: 'dynamic',
          marginTop: '5%',
          marginBottom: '10%'
        },
        plot: {
          lineWidth: 2,
          shadow: 0,
          exact: true,
          preview: true
        },
        preview: {
          visible: true,
          height: 40,
          adjustLayout: true
        },
        'scroll-y': {
          'handle': {
            'background-color': '#000000',
            'alpha': 0.2,
            'border-radius': '10px',
            'height': '10px' // scroll-x only
          }
        },
        'scroll-x': {
          'handle': {
            'background-color': '#000000',
            'alpha': 1,
            'border-radius': '10px',
            'height': '10px' // scroll-x only
          }
        },
        scaleX: {
          format: '%v',
          zooming: true,
          'zoom-to': [0, (theta.length * 0.25)],
          label: {
            text: 'Samples',
            marginTop: 100
          },
          item: {
            autoAlign: true,
            maxChars: 10
          },
          tick: {
            lineColor: 'black',
            lineWidth: '2px',
            size: 8
          }
        },
        crosshairX: {
          plotLabel: {
            borderWidth: 3,
            borderRadius: 5,
            borderColor: 'gray',
            backgroundColor: '#fff',
            width: 100
          }
        },
        scaleY: {
          zooming: true,
          // minValue: Math.min(this.results.filter_signal),
          // maxValue: Math.max(this.results.filter_signal),
          decimals: 0,
          label: {
            text: 'Amplitude',
            // marginTop: 100
          }
        }
      },
      height : null,
      width : null
    };

    this.featured_eeg2 = {
      id : 'chart-4',
      data : {
        type: 'line',
        backgroundColor: 'white',
        marginBottom: '10px',
        title: {
          text: 'Alpha-Low Rhythm (8-10 Hz)',
        },
        legend: {
          layout: 'h',
          align: 'center',
          backgroundColor: 'none',
          borderWidth: 0,
          verticalAlign: 'top',
          adjustLayout: true,
          marginTop: '15%',
          visible: false
        },
        series: [  // Insert your series data here.
          {
            values: alpha_low,
            'marker': {
              /* Marker object */
              'background-color': '#6666FF', /* hexadecimal or RGB value */
              'size': 0, /* in pixels */
              'border-color': '#6666FF', /* hexadecimal or RBG value */
              'border-width': 0 /* in pixels */
            },
            'line-color': '#6666FF', /* hexadecimal or RGB value */
            'line-style': 'solid', /* "solid" | "dotted" */
            'line-width': 2 /* in pixels */
          }],
        plotarea: {
          adjustLayout: 1,
          width: '100%',
          margin: 'dynamic',
          marginTop: '5%',
          marginBottom: '10%'
        },
        plot: {
          lineWidth: 2,
          shadow: 0,
          exact: true,
          preview: true
        },
        preview: {
          visible: true,
          height: 40,
          adjustLayout: true
        },
        'scroll-y': {
          'handle': {
            'background-color': '#000000',
            'alpha': 0.2,
            'border-radius': '10px',
            'height': '10px' // scroll-x only
          }
        },
        'scroll-x': {
          'handle': {
            'background-color': '#000000',
            'alpha': 1,
            'border-radius': '10px',
            'height': '10px' // scroll-x only
          }
        },
        scaleX: {
          format: '%v',
          zooming: true,
          'zoom-to': [0, (alpha_low.length * 0.25)],
          label: {
            text: 'Samples',
            marginTop: 100
          },
          item: {
            autoAlign: true,
            maxChars: 10
          },
          tick: {
            lineColor: 'black',
            lineWidth: '2px',
            size: 8
          }
        },
        crosshairX: {
          plotLabel: {
            borderWidth: 3,
            borderRadius: 5,
            borderColor: 'gray',
            backgroundColor: '#fff',
            width: 100
          }
        },
        scaleY: {
          zooming: true,
          // minValue: Math.min(this.results.filter_signal),
          // maxValue: Math.max(this.results.filter_signal),
          decimals: 0,
          label: {
            text: 'Amplitude',
            // marginTop: 100
          }
        }
      },
      height : null,
      width : null
    };

    this.featured_eeg3 = {
      id : 'chart-5',
      data : {
        type: 'line',
        backgroundColor: 'white',
        marginBottom: '10px',
        title: {
          text: 'Alpha-High Rhythm (11-13 Hz)',
        },
        legend: {
          layout: 'h',
          align: 'center',
          backgroundColor: 'none',
          borderWidth: 0,
          verticalAlign: 'top',
          adjustLayout: true,
          marginTop: '15%',
          visible: false
        },
        series: [  // Insert your series data here.
          {
            values: alpha_high,
            'marker': {
              /* Marker object */
              'background-color': '#6666FF', /* hexadecimal or RGB value */
              'size': 0, /* in pixels */
              'border-color': '#6666FF', /* hexadecimal or RBG value */
              'border-width': 0 /* in pixels */
            },
            'line-color': '#6666FF', /* hexadecimal or RGB value */
            'line-style': 'solid', /* "solid" | "dotted" */
            'line-width': 2 /* in pixels */
          }],
        plotarea: {
          adjustLayout: 1,
          width: '100%',
          margin: 'dynamic',
          marginTop: '5%',
          marginBottom: '10%'
        },
        plot: {
          lineWidth: 2,
          shadow: 0,
          exact: true,
          preview: true
        },
        preview: {
          visible: true,
          height: 40,
          adjustLayout: true
        },
        'scroll-y': {
          'handle': {
            'background-color': '#000000',
            'alpha': 0.2,
            'border-radius': '10px',
            'height': '10px' // scroll-x only
          }
        },
        'scroll-x': {
          'handle': {
            'background-color': '#000000',
            'alpha': 1,
            'border-radius': '10px',
            'height': '10px' // scroll-x only
          }
        },
        scaleX: {
          format: '%v',
          zooming: true,
          'zoom-to': [0, (alpha_high.length * 0.25)],
          label: {
            text: 'Samples',
            marginTop: 100
          },
          item: {
            autoAlign: true,
            maxChars: 10
          },
          tick: {
            lineColor: 'black',
            lineWidth: '2px',
            size: 8
          }
        },
        crosshairX: {
          plotLabel: {
            borderWidth: 3,
            borderRadius: 5,
            borderColor: 'gray',
            backgroundColor: '#fff',
            width: 100
          }
        },
        scaleY: {
          zooming: true,
          // minValue: Math.min(this.results.filter_signal),
          // maxValue: Math.max(this.results.filter_signal),
          decimals: 0,
          label: {
            text: 'Amplitude',
            // marginTop: 100
          }
        }
      },
      height : null,
      width : null
    };

    this.featured_eeg4 = {
      id : 'chart-6',
      data : {
        type: 'line',
        backgroundColor: 'white',
        marginBottom: '10px',
        title: {
          text: 'Beta Rhythm (14-30 Hz)',
        },
        legend: {
          layout: 'h',
          align: 'center',
          backgroundColor: 'none',
          borderWidth: 0,
          verticalAlign: 'top',
          adjustLayout: true,
          marginTop: '15%',
          visible: false
        },
        series: [  // Insert your series data here.
          {
            values: beta,
            'marker': {
              /* Marker object */
              'background-color': '#6666FF', /* hexadecimal or RGB value */
              'size': 0, /* in pixels */
              'border-color': '#6666FF', /* hexadecimal or RBG value */
              'border-width': 0 /* in pixels */
            },
            'line-color': '#6666FF', /* hexadecimal or RGB value */
            'line-style': 'solid', /* "solid" | "dotted" */
            'line-width': 2 /* in pixels */
          }],
        plotarea: {
          adjustLayout: 1,
          width: '100%',
          margin: 'dynamic',
          marginTop: '5%',
          marginBottom: '10%'
        },
        plot: {
          lineWidth: 2,
          shadow: 0,
          exact: true,
          preview: true
        },
        preview: {
          visible: true,
          height: 40,
          adjustLayout: true
        },
        'scroll-y': {
          'handle': {
            'background-color': '#000000',
            'alpha': 0.2,
            'border-radius': '10px',
            'height': '10px' // scroll-x only
          }
        },
        'scroll-x': {
          'handle': {
            'background-color': '#000000',
            'alpha': 1,
            'border-radius': '10px',
            'height': '10px' // scroll-x only
          }
        },
        scaleX: {
          format: '%v',
          zooming: true,
          'zoom-to': [0, (beta.length * 0.25)],
          label: {
            text: 'Samples',
            marginTop: 100
          },
          item: {
            autoAlign: true,
            maxChars: 10
          },
          tick: {
            lineColor: 'black',
            lineWidth: '2px',
            size: 8
          }
        },
        crosshairX: {
          plotLabel: {
            borderWidth: 3,
            borderRadius: 5,
            borderColor: 'gray',
            backgroundColor: '#fff',
            width: 100
          }
        },
        scaleY: {
          zooming: true,
          // minValue: Math.min(this.results.filter_signal),
          // maxValue: Math.max(this.results.filter_signal),
          decimals: 0,
          label: {
            text: 'Amplitude',
            // marginTop: 100
          }
        }
      },
      height : null,
      width : null
    };

    this.featured_eeg5 = {
      id : 'chart-7',
      data : {
        type: 'line',
        backgroundColor: 'white',
        marginBottom: '10px',
        title: {
          text: 'Gamma Rhythm (31-100Hz)',
        },
        legend: {
          layout: 'h',
          align: 'center',
          backgroundColor: 'none',
          borderWidth: 0,
          verticalAlign: 'top',
          adjustLayout: true,
          marginTop: '15%',
          visible: false
        },
        series: [  // Insert your series data here.
          {
            values: gamma,
            'marker': {
              /* Marker object */
              'background-color': '#6666FF', /* hexadecimal or RGB value */
              'size': 0, /* in pixels */
              'border-color': '#6666FF', /* hexadecimal or RBG value */
              'border-width': 0 /* in pixels */
            },
            'line-color': '#6666FF', /* hexadecimal or RGB value */
            'line-style': 'solid', /* "solid" | "dotted" */
            'line-width': 2 /* in pixels */
          }],
        plotarea: {
          adjustLayout: 1,
          width: '100%',
          margin: 'dynamic',
          marginTop: '5%',
          marginBottom: '10%'
        },
        plot: {
          lineWidth: 2,
          shadow: 0,
          exact: true,
          preview: true
        },
        preview: {
          visible: true,
          height: 40,
          adjustLayout: true
        },
        'scroll-y': {
          'handle': {
            'background-color': '#000000',
            'alpha': 0.2,
            'border-radius': '10px',
            'height': '10px' // scroll-x only
          }
        },
        'scroll-x': {
          'handle': {
            'background-color': '#000000',
            'alpha': 1,
            'border-radius': '10px',
            'height': '10px' // scroll-x only
          }
        },
        scaleX: {
          format: '%v',
          zooming: true,
          'zoom-to': [0, (gamma.length * 0.25)],
          label: {
            text: 'Samples',
            marginTop: 100
          },
          item: {
            autoAlign: true,
            maxChars: 10
          },
          tick: {
            lineColor: 'black',
            lineWidth: '2px',
            size: 8
          }
        },
        crosshairX: {
          plotLabel: {
            borderWidth: 3,
            borderRadius: 5,
            borderColor: 'gray',
            backgroundColor: '#fff',
            width: 100
          }
        },
        scaleY: {
          zooming: true,
          // minValue: Math.min(this.results.filter_signal),
          // maxValue: Math.max(this.results.filter_signal),
          decimals: 0,
          label: {
            text: 'Amplitude',
            // marginTop: 100
          }
        }
      },
      height : null,
      width : null
    };
    console.log(this.results);
  }
  }

