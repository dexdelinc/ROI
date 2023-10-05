import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-optimize-operations',
  templateUrl: './optimize-operations.component.html',
  styleUrls: ['./optimize-operations.component.css']
})
export class OptimizeOperationsComponent implements OnInit{
  obj:any
  data:any;
  data1 = [[0, 0], [1, 0.05], [2, 0.25], [3, 0.65], [4, 1.35], [5, 2.45]]

  highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'spline',
      inverted: false,
      width: 270,
      height: 200
    },
    title: undefined,
    xAxis: {
      crosshair: false,
      tickLength: 0,
      reversed: false,
      gridLineColor: '#ffffff',
      lineColor: '#ffffff',
      // title: {
      // enabled: false,
      // },
      labels: {
        enabled: false
      },
      accessibility: {
        rangeDescription: 'Range: 0 to 80 km.'
      },
      maxPadding: 0.05,
      showLastLabel: true
    },
    yAxis: {
      title: undefined,
      labels: {
        enabled: false
      },
      gridLineColor: '#ffffff',
      lineColor: '#ffffff',
      accessibility: {
        rangeDescription: 'Range: 0°C to 20°C.'
      },
      lineWidth: 0
    },
    legend: {
      enabled: false
    },
    tooltip: {
      enabled: false,
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false,
          symbol: 'auto',
          lineWidth: 0,
          radius: 4,
          lineColor: '#FFFFFF',
          fillColor: '#ff4801',
        }
      }
    },
    series: [
      {
        type: 'spline',
        data: this.data1,
        color: 'green',
      },
    ]
  };
  data5Y: any;

  ngOnInit() {
    let item=localStorage.getItem('storeData')
    this.obj=item
        this.data=JSON.parse(this.obj)
        console.log(this.data);
      item=localStorage.getItem('storeData5Y')
        this.obj=item
        this.data5Y=JSON.parse(this.obj)
        console.log(this.data);
  }
}
