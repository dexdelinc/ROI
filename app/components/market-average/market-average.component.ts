import { Component, OnInit } from '@angular/core';
import { RequiredValidator } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-market-average',
  templateUrl: './market-average.component.html',
  styleUrls: ['./market-average.component.css']
})
export class MarketAverageComponent implements OnInit {
  percent = '%'
  showImg = false
  marketForm: any
  obj: any = {}
  data: any
  D70 = 100000
  D71 = 1
  D72 = 450000
  D73 = 16.5
  D74 = 300000
  D75 = 8
  D76 = 4.38
  D77 = 5666667
  D78 = 9440000
  D84 = 0.20
  D85 = 0.18
  D87 = 0.09
  D86 = 0.09
  D88 = 0.26
  D90 = 0.07
  D91 = 0.07
  D92 = 0.07
  D93 = 0.06
  D94 = 0.05
  D95 = 0.04

  xFactor: any;
  vlookup: any
  rtnofInvest: any;
  rtnofInvestDis: any;
  data1 = [[0, 0], [1, 0.05], [2, 0.25], [3, 0.65], [4, 1.35], [5, 2.45]]
  highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'spline',
      inverted: false,
      width: 300,
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

  constructor(private spinner: NgxSpinnerService, private router: Router) { }
  ngOnInit() {
    if (localStorage.getItem('userInput') != null) {
      // console.log(123);
      let item: any = localStorage.getItem('userInput')
      console.log(JSON.parse(item).D74)
      this.D74 = JSON.parse(item).D74
      this.D75 = JSON.parse(item).D75
      this.D76 = JSON.parse(item).D76
      this.D77 = JSON.parse(item).D77
      this.D78 = JSON.parse(item).D78

    }

    let item = localStorage.getItem('storeData')
    this.obj = item
    this.data = JSON.parse(this.obj)
    console.log(this.data);
    item = localStorage.getItem('storeData5Y')
    this.obj = item
    this.data5Y = JSON.parse(this.obj)
    console.log(this.data);

    this.marketAvgForm()
  }
  marketAvgForm() {

    this.marketForm = new FormGroup({
      D74: new FormControl(this.D74),
      D75: new FormControl(this.D75),
      D76: new FormControl(this.D76),
      D77: new FormControl(this.D77),
      D78: new FormControl(this.D78),
    });
    console.log(this.marketForm.value);

    localStorage.setItem('userInput', JSON.stringify(this.marketForm.value))

  }

  onchange(event: any) {

    console.log(event);

    console.log(this.marketForm.value);

    localStorage.setItem('userInput', JSON.stringify(this.marketForm.value))

    console.log(localStorage.getItem('userInput'))


  }
  reset() {
    this.D74 = 300000
    this.D75 = 8
    this.D76 = 4.38
    this.D77 = 5666667
    this.D78 = 9440000
    localStorage.removeItem('userInput')

    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
      // this.router.navigate(['roi-calculator'])
      this.marketAvgForm()

    }, 600)


  }
  onSubmit() {
    // window.location.reload()
    this.router.navigate(['/'])
  }
}
