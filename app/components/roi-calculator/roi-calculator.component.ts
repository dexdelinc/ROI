import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { Chart, CategoryScale, LineController, LinearScale, PointElement, LineElement } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { Country } from '@angular-material-extensions/select-country';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-roi-calculator',
  templateUrl: './roi-calculator.component.html',
  styleUrls: ['./roi-calculator.component.css']
})
export class RoiCalculatorComponent implements OnInit {
  submitted = false;
  percent = '%'
  showImg = false
  storeData: any = {}
  storeData5Y: any = {}
  defaultValue: Country = {
    name: 'United States',
    alpha2Code: 'US',
    alpha3Code: 'USA',
    numericCode: '840',
    callingCode: '+1'

  };
  loader = false
  cores = 1
  currentDevice = 100000
  expectedDevice = 200000
  chart: any = null
  roiForm: any
  roiConst: any
  roiFormula: any
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

  G79: any;
  G81: any;
  G18: any;
  G33: any;
  G42: any;
  G51: any;
  G64: any;
  G8: any;
  G10: any;
  G12: any;
  G14: any;
  G16: any;
  G23: any;
  G25: any;
  G27: any;
  G29: any;
  G31: any;
  G38: any;
  G40: any;
  G47: any;
  G49: any;
  G56: any
  G58: any;
  G60: any;
  G62: any;
  // for Saving in 5 Year
  G17: any
  G32: any
  G41: any
  G50: any
  G63: any

  E8: any;
  E10: any;
  E12: any;
  E14: any;
  E16: any;
  E23: any
  E25: any
  E27: any
  E29: any
  E31: any
  E38: any
  E40: any
  E47: any;
  E49: any
  E56: any
  E58: any;
  E60: any;
  E62: any

  F8 = 0.9
  F10 = 0.9
  F12 = 0.8
  F14 = 0.3
  F16 = 0.85
  F23 = 0.40
  F25 = 0.40
  F27 = 0.85
  F29 = 0.85
  F31 = 0.85
  F38 = 0.9
  F40 = 0.9
  F47 = 0.5
  F49 = 0.9
  F56 = 0.40
  F58 = 0.90
  F60 = 0.40
  F62 = 0.30
  xFactor: any;
  match = false
  vlookup: any
  rtnofInvest: any;
  rtnofInvestDis: any;
  rtnofInvest5Y: any;
  rtnofInvestDis5Y: any;
  G83: any;
  data = [[0, 0], [1, 0.05], [2, 0.25], [3, 0.65], [4, 1.35], [5, 2.45]]

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
        data: this.data,
        color: 'green',
      },
    ]
  };

  constructor(private spinner: NgxSpinnerService, private httpClient: HttpClient,private router: Router) {

  }
  ngOnInit() {
    let baseValues : any = localStorage.getItem('baseValues');
    baseValues = JSON.parse(baseValues)
    console.log(baseValues);
    this.D70 = parseInt(baseValues.currentDevice)
    this.D71 = parseInt(baseValues.cores)
    this.expectedDevice = parseInt(baseValues.expectedDevice)
    this.httpClient.get("assets/roi-const.json").subscribe((data: any) => {
      // console.log(data.D72);
      this.roiConst = data
    })
    this.httpClient.get("assets/roi-formula.json").subscribe((data: any) => {
      // console.log(data);
      this.roiFormula = data
    })
    this.createRoiForm()
    this.onCalcultor1Y()
    this.onCalcultor5Y()

  };
  createRoiForm() {
   
    this.roiForm = new FormGroup({
      country: new FormControl(this.defaultValue, Validators.required),
      industry: new FormControl('Utility', Validators.required),
      cores: new FormControl(this.D71, Validators.required),
      currentDevice: new FormControl(this.D70, Validators.required),
      expectedDevice: new FormControl(this.expectedDevice, Validators.required),
    });
  }
  Inc(event: any) {
    console.log(this.roiForm.value);
    
    if (event == 'cores') {
      this.D71 = this.D71 + 1
    } else if (event == 'currentDevice') {
      if (this.D70 < 100000) {
        this.D70 = this.D70 + 10000
      } else if (this.D70 < 1000000) {
        this.D70 = this.D70 + 100000
      } else if (this.D70 <= 2000000) {
        this.D70 = this.D70 + 1000000
      }

    } else if (event == 'expectedDevice') {
      if (this.expectedDevice < 100000) {
        this.expectedDevice = this.expectedDevice + 10000
      } else if (this.expectedDevice < 1000000) {
        this.expectedDevice = this.expectedDevice + 100000
      } else if (this.expectedDevice <= 2000000) {
        this.expectedDevice = this.expectedDevice + 1000000
      }
    }
    this.createRoiForm()

  }
  Dec(event: any) {
   
    if (event == 'cores' && this.D71 > 1) {
      this.D71 = this.D71 - 1
    } else if (event == 'currentDevice' && this.D70 > 10000) {
      if (this.D70 <= 100000) {
        this.D70 = this.D70 - 10000
      } else if (this.D70 <= 1000000) {
        this.D70 = this.D70 - 100000
      } else if (this.D70 <= 3000000) {
        this.D70 = this.D70 - 1000000
      }
    } else if (event == 'expectedDevice' && this.expectedDevice > 10000) {
      if (this.expectedDevice <= 100000) {
        this.expectedDevice = this.expectedDevice - 10000
      } else if (this.expectedDevice <= 1000000) {
        this.expectedDevice = this.expectedDevice - 100000
      } else if (this.expectedDevice <= 3000000) {
        this.expectedDevice = this.expectedDevice - 1000000
      }
    }
    this.createRoiForm()
  }
  onCountrySelected(country: Country) {
    // console.log(country);
  }
  get roiFormControl() {
    return this.roiForm.controls;
  }
  onCalcultor1Y() {
    let obj = {
      cores: this.roiForm.get('cores')?.value,
      currentDevice: this.roiForm.get('currentDevice')?.value,
      expectedDevice: this.roiForm.get('expectedDevice')?.value
    };
    localStorage.setItem('baseValues',JSON.stringify(obj))
    console.log(localStorage.getItem('userInput'));
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

    if (this.D70 < 100001) {
      this.xFactor = 12
    } else if (this.D70 < 1000001) {
      this.xFactor = 6
    } else if (this.D70 > 1000000) {
      this.xFactor = 3
    }
    this.D70 = this.roiForm.get('currentDevice').value
    this.D71 = this.roiForm.get('cores').value
    // (D70*_xlfn.IFS(D70<100001,12,D70<1000001,6,D70>1000000,3)+D71*D72)/D70
    this.D73 = ((this.D70 * this.xFactor) + (this.D71 * this.D72)) / this.D70
    // console.log(this.D73);

    this.submitted = true
    if (this.roiForm.get('currentDevice').value > this.roiForm.get('expectedDevice').value) {
      this.match = true
    } else {
      // console.log(this.roiForm.value);
      if (this.roiForm.valid) {
        this.match = false
        // console.log(this.D70, this.D71);

        localStorage.removeItem('storeData');
        this.spinner.show()
        setTimeout(() => {
          this.spinner.hide()
        }, 500)
        // this.loader = true
        // console.log(this.D70)
        if (this.D70 == 10000) {
          this.vlookup = 0.131
        } else if (this.D70 == 20000) {
          this.vlookup = 0.158
        } else if (this.D70 == 30000) {
          this.vlookup = 0.185
        } else if (this.D70 == 40000) {
          this.vlookup = 0.213
        } else if (this.D70 == 50000) {
          this.vlookup = 0.242
        } else if (this.D70 == 60000) {
          this.vlookup = 0.273
        } else if (this.D70 == 70000) {
          this.vlookup = 0.306
        } else if (this.D70 == 80000) {
          this.vlookup = 0.342
        } else if (this.D70 == 90000) {
          this.vlookup = 0.382
        } else if (this.D70 == 100000) {
          this.vlookup = 0.425
        } else if (this.D70 == 200000) {
          this.vlookup = 0.50
        } else if (this.D70 == 300000) {
          this.vlookup = 0.76
        } else if (this.D70 == 400000) {
          this.vlookup = 1.04
        } else if (this.D70 == 500000) {
          this.vlookup = 1.34
        } else if (this.D70 == 600000) {
          this.vlookup = 1.66
        } else if (this.D70 == 700000) {
          this.vlookup = 2.00
        } else if (this.D70 == 800000) {
          this.vlookup = 2.36
        } else if (this.D70 == 900000) {
          this.vlookup = 2.735
        } else if (this.D70 == 1000000) {
          this.vlookup = 3.13
        } else if (this.D70 == 2000000) {
          this.vlookup = 3.82
        } else if (this.D70 == 3000000) {
          this.vlookup = 6.26
        }

        // console.log(this.vlookup,this.xFactor);

        // we need to find return of inverment
        // Total Cost Saved ($ Year)
        this.E8 = (this.D73 * this.D70) * (this.D88 + this.D91)
        this.G8 = this.F8 * this.E8
        this.E10 = ((this.D73 * this.D70) * (this.D86 + this.D93)) / 4
        this.G10 = this.F10 * this.E10
        this.E12 = (this.D73 * this.D70) * this.D94
        this.G12 = this.F12 * this.E12
        // console.log(this.D74,this.D75,this.vlookup);  
        this.E14 = ((this.D74 * this.D75) / 3) * this.vlookup
        this.G14 = this.F14 * this.E14
        this.E16 = (this.D73 * this.D70) * this.D87
        this.G16 = this.F16 * this.E16
        this.G18 = this.G8 + this.G10 + this.G12 + this.G14 + this.G16
        this.G17 = this.E8 + this.E10 + this.E12 + this.E14 + this.E16
        // console.log(this.E8, this.E10, this.E12, this.E14, this.E16);
        // console.log(this.G8, this.G10, this.G12, this.G14, this.G16);
        // console.log(this.G18)
        // VLOOKUP($D$70,$D$134:$L$152,9)=0.215384615 now for actual
        this.E23 = (this.D74 * this.D75) / 3 * this.vlookup
        this.G23 = this.F23 * this.E23
        // VLOOKUP($D$70,$D$134:$L$152,9)=0.215384615 for actual
        this.E25 = (this.D74 * this.D75) / 3 * this.vlookup
        this.G25 = this.F25 * this.E25
        // =((D73*D70)*(D86+D93))/4
        this.E27 = ((this.D73 * this.D70) * (this.D86 + this.D93)) / 4
        this.G27 = this.F27 * this.E27
        // ((D73*D70)*(D86+D93))/4
        this.E29 = ((this.D73 * this.D70) * (this.D86 + this.D93)) / 4
        this.G29 = this.F29 * this.E29
        this.E31 = ((this.D73 * this.D70) * (this.D86 + this.D93)) / 4
        this.G31 = this.F31 * this.E31

        this.G33 = this.G23 + this.G25 + this.G27 + this.G29 + this.G31
        this.G32 = this.E23 + this.E25 + this.E27 + this.E29 + this.E31
        // console.log(this.E23, this.E25, this.E27, this.E29, this.E31);
        // console.log(this.G23, this.G25, this.G27, this.G29, this.G31);
        // console.log(this.G33)
        this.E38 = ((this.D73 * this.D70) * (this.D84)) / 2
        this.G38 = this.E38 * this.F38
        this.E40 = ((this.D73 * this.D70) * (this.D84)) / 2
        this.G40 = this.E40 * this.F40
        this.G42 = this.G38 + this.G40
        this.G41 = this.E38 + this.E40
        // console.log(this.E38,this.E40,this.G38,this.G40,this.G42);


        this.E47 = (this.D73 * this.D70) * (this.D92 + this.D95)
        this.G47 = this.E47 * this.F47
        this.E49 = ((this.D73 * this.D70) * (this.D90)) / 2
        this.G49 = this.E49 * this.F49
        this.G51 = this.G47 + this.G49
        this.G50 = this.E47 + this.E49
        // console.log(this.E47,this.E49,this.G49,this.G47,this.G51);

        this.E56 = this.D77 * this.vlookup
        this.G56 = this.E56 * this.F56
        this.E58 = ((this.D73 * this.D70) * (this.D90)) / 2
        this.G58 = this.E58 * this.F58
        // console.log(this.D74,this.D76,this.vlookup);

        this.E60 = this.D74 * this.D76 * this.vlookup
        this.G60 = this.E60 * this.F60

        this.E62 = this.D78 * this.vlookup
        this.G62 = this.E62 * this.F62
        this.G64 = (this.G56 + this.G58 + this.G60 + this.G62)
        this.G63 = (this.E56 + this.E58 + this.E60 + this.E62)
        // console.log(this.E56, this.E58, this.E60, this.E62);
        // console.log(this.G56, this.G58, this.G60, this.G62,);
        // console.log(this.G64)
        this.G79 = this.G18 + this.G33 + this.G42 + this.G51 + this.G64
        // (D70*_xlfn.IFS(D70<100001,12,D70<1000001,6,D70>1000000,3)+D71*D72)+10000+10000

        this.G81 = (this.D70 * this.xFactor + this.D71 * this.D72) + 10000 + 10000
        this.rtnofInvest = (((this.G79 / this.G81) * 100)).toFixed(2)
        this.G83 = this.G81 * 0.75
        // this.rtnofInvestDis = (((this.G79 / this.G81 * 0.75) * 100)).toFixed(2)
        this.rtnofInvestDis = Math.round((this.G79 / this.G83) * 100)
        // console.log(this.rtnofInvestDis);


        if (this.chart != null) {
          this.chart.destroy()
        }

        this.showImg = true
        if (this.D70 == this.expectedDevice) {
          this.showImg = false

        }
        // localStorage Save data
        this.storeData = {
          "D70": (Math.round(this.D70)).toLocaleString('en-US'),
          "D71": (Math.round(this.D71)).toLocaleString('en-US'),
          "D72": (Math.round(this.D72)).toLocaleString('en-US'),
          "D73": (Math.round(this.D73)).toLocaleString('en-US'),
          "D74": (Math.round(this.D74)).toLocaleString('en-US'),
          "D75": (Math.round(this.D75)).toLocaleString('en-US'),
          "D76": (Math.round(this.D76)).toLocaleString('en-US'),
          "D77": (Math.round(this.D77)).toLocaleString('en-US'),
          "D78": (Math.round(this.D78)).toLocaleString('en-US'),
          "D84": (Math.round(this.D84)).toLocaleString('en-US'),
          "D85": (Math.round(this.D85)).toLocaleString('en-US'),
          "D86": (Math.round(this.D86)).toLocaleString('en-US'),
          "D88": (Math.round(this.D88)).toLocaleString('en-US'),
          "D87": (Math.round(this.D87)).toLocaleString('en-US'),
          "D90": (Math.round(this.D90)).toLocaleString('en-US'),
          "D91": (Math.round(this.D91)).toLocaleString('en-US'),
          "D92": (Math.round(this.D92)).toLocaleString('en-US'),
          "D93": (Math.round(this.D93)).toLocaleString('en-US'),
          "D94": (Math.round(this.D94)).toLocaleString('en-US'),
          "D95": (Math.round(this.D95)).toLocaleString('en-US'),
          "G79": (Math.round(this.G79)).toLocaleString('en-US'),
          "G81": (Math.round(this.G81)).toLocaleString('en-US'),
          "G17": (Math.round(this.G17)).toLocaleString('en-US'),
          "G18": (Math.round(this.G18)).toLocaleString('en-US'),
          "G32": (Math.round(this.G32)).toLocaleString('en-US'),
          "G33": (Math.round(this.G33)).toLocaleString('en-US'),
          "G41": (Math.round(this.G41)).toLocaleString('en-US'),
          "G42": (Math.round(this.G42)).toLocaleString('en-US'),
          "G50": (Math.round(this.G50)).toLocaleString('en-US'),
          "G51": (Math.round(this.G51)).toLocaleString('en-US'),
          "G63": (Math.round(this.G63)).toLocaleString('en-US'),
          "G64": (Math.round(this.G64)).toLocaleString('en-US'),
          "G8": (Math.round(this.G8)).toLocaleString('en-US'),
          "G10": (Math.round(this.G10)).toLocaleString('en-US'),
          "G12": (Math.round(this.G12)).toLocaleString('en-US'),
          "G14": (Math.round(this.G14)).toLocaleString('en-US'),
          "G16": (Math.round(this.G16)).toLocaleString('en-US'),
          "G23": (Math.round(this.G23)).toLocaleString('en-US'),
          "G25": (Math.round(this.G25)).toLocaleString('en-US'),
          "G27": (Math.round(this.G27)).toLocaleString('en-US'),
          "G29": (Math.round(this.G29)).toLocaleString('en-US'),
          "G31": (Math.round(this.G31)).toLocaleString('en-US'),
          "G38": (Math.round(this.G38)).toLocaleString('en-US'),
          "G40": (Math.round(this.G40)).toLocaleString('en-US'),
          "G47": (Math.round(this.G47)).toLocaleString('en-US'),
          "G49": (Math.round(this.G49)).toLocaleString('en-US'),
          "G56": (Math.round(this.G56)).toLocaleString('en-US'),
          "G58": (Math.round(this.G58)).toLocaleString('en-US'),
          "G60": (Math.round(this.G60)).toLocaleString('en-US'),
          "G62": (Math.round(this.G62)).toLocaleString('en-US'),
          "E8": (Math.round(this.E8)).toLocaleString('en-US'),
          "E10": (Math.round(this.E10)).toLocaleString('en-US'),
          "E12": (Math.round(this.E12)).toLocaleString('en-US'),
          "E14": (Math.round(this.E14)).toLocaleString('en-US'),
          "E16": (Math.round(this.E16)).toLocaleString('en-US'),
          "E23": (Math.round(this.E23)).toLocaleString('en-US'),
          "E25": (Math.round(this.E25)).toLocaleString('en-US'),
          "E27": (Math.round(this.E27)).toLocaleString('en-US'),
          "E29": (Math.round(this.E29)).toLocaleString('en-US'),
          "E31": (Math.round(this.E31)).toLocaleString('en-US'),
          "E38": (Math.round(this.E38)).toLocaleString('en-US'),
          "E40": (Math.round(this.E40)).toLocaleString('en-US'),
          "E47": (Math.round(this.E47)).toLocaleString('en-US'),
          "E49": (Math.round(this.E49)).toLocaleString('en-US'),
          "E56": (Math.round(this.E56)).toLocaleString('en-US'),
          "E58": (Math.round(this.E58)).toLocaleString('en-US'),
          "E60": (Math.round(this.E60)).toLocaleString('en-US'),
          "E62": (Math.round(this.E62)).toLocaleString('en-US'),
          "F8": (Math.round(this.F8)).toLocaleString('en-US'),
          "F10": (Math.round(this.F10)).toLocaleString('en-US'),
          "F12": (Math.round(this.F12)).toLocaleString('en-US'),
          "F14": (Math.round(this.F14)).toLocaleString('en-US'),
          "F16": (Math.round(this.F16)).toLocaleString('en-US'),
          "F23": (Math.round(this.F23)).toLocaleString('en-US'),
          "F25": (Math.round(this.F25)).toLocaleString('en-US'),
          "F27": (Math.round(this.F27)).toLocaleString('en-US'),
          "F29": (Math.round(this.F29)).toLocaleString('en-US'),
          "F31": (Math.round(this.F31)).toLocaleString('en-US'),
          "F38": (Math.round(this.F38)).toLocaleString('en-US'),
          "F40": (Math.round(this.F40)).toLocaleString('en-US'),
          "F47": (Math.round(this.F47)).toLocaleString('en-US'),
          "F49": (Math.round(this.F49)).toLocaleString('en-US'),
          "F56": (Math.round(this.F56)).toLocaleString('en-US'),
          "F58": (Math.round(this.F58)).toLocaleString('en-US'),
          "F60": (Math.round(this.F60)).toLocaleString('en-US'),
          "F62": (Math.round(this.F62)).toLocaleString('en-US'),
          "returnOfinvest": (Math.round(this.rtnofInvest).toLocaleString('en-US')),
          "returnOfinvestDis": (Math.round(this.rtnofInvestDis)).toLocaleString('en-US'),

          "country": (this.roiForm.get('country').value.name),
          "industry": (this.roiForm.get('industry').value).toLocaleString('en-US'),
          "expectedDevice": (this.roiForm.get('expectedDevice').value).toLocaleString('en-US'),
        }
        localStorage.setItem('storeData', JSON.stringify(this.storeData))
        this.onCalcultor5Y();


      }
    }

  }
  onCalcultor5Y() {
    this.D70=this.expectedDevice
    console.log(localStorage.getItem('userInput'));
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

    if (this.D70 < 100001) {
      this.xFactor = 12
    } else if (this.D70 < 1000001) {
      this.xFactor = 6
    } else if (this.D70 > 1000000) {
      this.xFactor = 3
    }
    this.D70 = this.roiForm.get('expectedDevice').value
    console.log(this.D70);
    
    this.D71 = this.roiForm.get('cores').value
    // (D70*_xlfn.IFS(D70<100001,12,D70<1000001,6,D70>1000000,3)+D71*D72)/D70
    this.D73 = ((this.D70 * this.xFactor) + (this.D71 * this.D72)) / this.D70
    // console.log(this.D73);

    this.submitted = true
    if (this.roiForm.get('currentDevice').value > this.roiForm.get('expectedDevice').value) {
      this.match = true
    } else {
      // console.log(this.roiForm.value);
      if (this.roiForm.valid) {
        this.match = false
        // console.log(this.D70, this.D71);

        localStorage.removeItem('storeData5Y');
        this.spinner.show()
        setTimeout(() => {
          this.spinner.hide()
        }, 500)
        // this.loader = true
        // console.log(this.D70)
        if (this.D70 == 10000) {
          this.vlookup = 0.131
        } else if (this.D70 == 20000) {
          this.vlookup = 0.158
        } else if (this.D70 == 30000) {
          this.vlookup = 0.185
        } else if (this.D70 == 40000) {
          this.vlookup = 0.213
        } else if (this.D70 == 50000) {
          this.vlookup = 0.242
        } else if (this.D70 == 60000) {
          this.vlookup = 0.273
        } else if (this.D70 == 70000) {
          this.vlookup = 0.306
        } else if (this.D70 == 80000) {
          this.vlookup = 0.342
        } else if (this.D70 == 90000) {
          this.vlookup = 0.382
        } else if (this.D70 == 100000) {
          this.vlookup = 0.425
        } else if (this.D70 == 200000) {
          this.vlookup = 0.50
        } else if (this.D70 == 300000) {
          this.vlookup = 0.76
        } else if (this.D70 == 400000) {
          this.vlookup = 1.04
        } else if (this.D70 == 500000) {
          this.vlookup = 1.34
        } else if (this.D70 == 600000) {
          this.vlookup = 1.66
        } else if (this.D70 == 700000) {
          this.vlookup = 2.00
        } else if (this.D70 == 800000) {
          this.vlookup = 2.36
        } else if (this.D70 == 900000) {
          this.vlookup = 2.735
        } else if (this.D70 == 1000000) {
          this.vlookup = 3.13
        } else if (this.D70 == 2000000) {
          this.vlookup = 3.82
        } else if (this.D70 == 3000000) {
          this.vlookup = 6.26
        }

        // console.log(this.vlookup,this.xFactor);

        // we need to find return of inverment
        // Total Cost Saved ($ Year)
        this.E8 = (this.D73 * this.D70) * (this.D88 + this.D91)
        this.G8 = this.F8 * this.E8
        this.E10 = ((this.D73 * this.D70) * (this.D86 + this.D93)) / 4
        this.G10 = this.F10 * this.E10
        this.E12 = (this.D73 * this.D70) * this.D94
        this.G12 = this.F12 * this.E12
        // console.log(this.D74,this.D75,this.vlookup);  
        this.E14 = ((this.D74 * this.D75) / 3) * this.vlookup
        this.G14 = this.F14 * this.E14
        this.E16 = (this.D73 * this.D70) * this.D87
        this.G16 = this.F16 * this.E16
        this.G18 = this.G8 + this.G10 + this.G12 + this.G14 + this.G16
        this.G17 = this.E8 + this.E10 + this.E12 + this.E14 + this.E16
        // console.log(this.E8, this.E10, this.E12, this.E14, this.E16);
        // console.log(this.G8, this.G10, this.G12, this.G14, this.G16);
        // console.log(this.G18)
        // VLOOKUP($D$70,$D$134:$L$152,9)=0.215384615 now for actual
        this.E23 = (this.D74 * this.D75) / 3 * this.vlookup
        this.G23 = this.F23 * this.E23
        // VLOOKUP($D$70,$D$134:$L$152,9)=0.215384615 for actual
        this.E25 = (this.D74 * this.D75) / 3 * this.vlookup
        this.G25 = this.F25 * this.E25
        // =((D73*D70)*(D86+D93))/4
        this.E27 = ((this.D73 * this.D70) * (this.D86 + this.D93)) / 4
        this.G27 = this.F27 * this.E27
        // ((D73*D70)*(D86+D93))/4
        this.E29 = ((this.D73 * this.D70) * (this.D86 + this.D93)) / 4
        this.G29 = this.F29 * this.E29
        this.E31 = ((this.D73 * this.D70) * (this.D86 + this.D93)) / 4
        this.G31 = this.F31 * this.E31

        this.G33 = this.G23 + this.G25 + this.G27 + this.G29 + this.G31
        this.G32 = this.E23 + this.E25 + this.E27 + this.E29 + this.E31
        // console.log(this.E23, this.E25, this.E27, this.E29, this.E31);
        // console.log(this.G23, this.G25, this.G27, this.G29, this.G31);
        // console.log(this.G33)
        this.E38 = ((this.D73 * this.D70) * (this.D84)) / 2
        this.G38 = this.E38 * this.F38
        this.E40 = ((this.D73 * this.D70) * (this.D84)) / 2
        this.G40 = this.E40 * this.F40
        this.G42 = this.G38 + this.G40
        this.G41 = this.E38 + this.E40
        // console.log(this.E38,this.E40,this.G38,this.G40,this.G42);


        this.E47 = (this.D73 * this.D70) * (this.D92 + this.D95)
        this.G47 = this.E47 * this.F47
        this.E49 = ((this.D73 * this.D70) * (this.D90)) / 2
        this.G49 = this.E49 * this.F49
        this.G51 = this.G47 + this.G49
        this.G50 = this.E47 + this.E49
        // console.log(this.E47,this.E49,this.G49,this.G47,this.G51);

        this.E56 = this.D77 * this.vlookup
        this.G56 = this.E56 * this.F56
        this.E58 = ((this.D73 * this.D70) * (this.D90)) / 2
        this.G58 = this.E58 * this.F58
        // console.log(this.D74,this.D76,this.vlookup);

        this.E60 = this.D74 * this.D76 * this.vlookup
        this.G60 = this.E60 * this.F60

        this.E62 = this.D78 * this.vlookup
        this.G62 = this.E62 * this.F62
        this.G64 = (this.G56 + this.G58 + this.G60 + this.G62)
        this.G63 = (this.E56 + this.E58 + this.E60 + this.E62)
        // console.log(this.E56, this.E58, this.E60, this.E62);
        // console.log(this.G56, this.G58, this.G60, this.G62,);
        // console.log(this.G64)
        this.G79 = this.G18 + this.G33 + this.G42 + this.G51 + this.G64
        // (D70*_xlfn.IFS(D70<100001,12,D70<1000001,6,D70>1000000,3)+D71*D72)+10000+10000

        this.G81 = (this.D70 * this.xFactor + this.D71 * this.D72) + 10000 + 10000
        this.rtnofInvest = (((this.G79 / this.G81) * 100)).toFixed(2)
        this.G83 = this.G81 * 0.75
        // this.rtnofInvestDis = (((this.G79 / this.G81 * 0.75) * 100)).toFixed(2)
        this.rtnofInvestDis5Y = Math.round((this.G79 / this.G83) * 100)
        console.log(this.rtnofInvestDis5Y);


        // if (this.chart != null) {
        //   this.chart.destroy()
        // }

        // this.showImg = true
        // if (this.D70 == this.expectedDevice) {
        //   this.showImg = false

        // }
        // localStorage Save data
        this.storeData5Y = {
          "D70": (Math.round(this.D70)).toLocaleString('en-US'),
          "D71": (Math.round(this.D71)).toLocaleString('en-US'),
          "D72": (Math.round(this.D72)).toLocaleString('en-US'),
          "D73": (Math.round(this.D73)).toLocaleString('en-US'),
          "D74": (Math.round(this.D74)).toLocaleString('en-US'),
          "D75": (Math.round(this.D75)).toLocaleString('en-US'),
          "D76": (Math.round(this.D76)).toLocaleString('en-US'),
          "D77": (Math.round(this.D77)).toLocaleString('en-US'),
          "D78": (Math.round(this.D78)).toLocaleString('en-US'),
          "D84": (Math.round(this.D84)).toLocaleString('en-US'),
          "D85": (Math.round(this.D85)).toLocaleString('en-US'),
          "D86": (Math.round(this.D86)).toLocaleString('en-US'),
          "D88": (Math.round(this.D88)).toLocaleString('en-US'),
          "D87": (Math.round(this.D87)).toLocaleString('en-US'),
          "D90": (Math.round(this.D90)).toLocaleString('en-US'),
          "D91": (Math.round(this.D91)).toLocaleString('en-US'),
          "D92": (Math.round(this.D92)).toLocaleString('en-US'),
          "D93": (Math.round(this.D93)).toLocaleString('en-US'),
          "D94": (Math.round(this.D94)).toLocaleString('en-US'),
          "D95": (Math.round(this.D95)).toLocaleString('en-US'),
          "G79": (Math.round(this.G79)).toLocaleString('en-US'),
          "G81": (Math.round(this.G81)).toLocaleString('en-US'),
          "G17": (Math.round(this.G17)).toLocaleString('en-US'),
          "G18": (Math.round(this.G18)).toLocaleString('en-US'),
          "G32": (Math.round(this.G32)).toLocaleString('en-US'),
          "G33": (Math.round(this.G33)).toLocaleString('en-US'),
          "G41": (Math.round(this.G41)).toLocaleString('en-US'),
          "G42": (Math.round(this.G42)).toLocaleString('en-US'),
          "G50": (Math.round(this.G50)).toLocaleString('en-US'),
          "G51": (Math.round(this.G51)).toLocaleString('en-US'),
          "G63": (Math.round(this.G63)).toLocaleString('en-US'),
          "G64": (Math.round(this.G64)).toLocaleString('en-US'),
          "G8": (Math.round(this.G8)).toLocaleString('en-US'),
          "G10": (Math.round(this.G10)).toLocaleString('en-US'),
          "G12": (Math.round(this.G12)).toLocaleString('en-US'),
          "G14": (Math.round(this.G14)).toLocaleString('en-US'),
          "G16": (Math.round(this.G16)).toLocaleString('en-US'),
          "G23": (Math.round(this.G23)).toLocaleString('en-US'),
          "G25": (Math.round(this.G25)).toLocaleString('en-US'),
          "G27": (Math.round(this.G27)).toLocaleString('en-US'),
          "G29": (Math.round(this.G29)).toLocaleString('en-US'),
          "G31": (Math.round(this.G31)).toLocaleString('en-US'),
          "G38": (Math.round(this.G38)).toLocaleString('en-US'),
          "G40": (Math.round(this.G40)).toLocaleString('en-US'),
          "G47": (Math.round(this.G47)).toLocaleString('en-US'),
          "G49": (Math.round(this.G49)).toLocaleString('en-US'),
          "G56": (Math.round(this.G56)).toLocaleString('en-US'),
          "G58": (Math.round(this.G58)).toLocaleString('en-US'),
          "G60": (Math.round(this.G60)).toLocaleString('en-US'),
          "G62": (Math.round(this.G62)).toLocaleString('en-US'),
          "E8": (Math.round(this.E8)).toLocaleString('en-US'),
          "E10": (Math.round(this.E10)).toLocaleString('en-US'),
          "E12": (Math.round(this.E12)).toLocaleString('en-US'),
          "E14": (Math.round(this.E14)).toLocaleString('en-US'),
          "E16": (Math.round(this.E16)).toLocaleString('en-US'),
          "E23": (Math.round(this.E23)).toLocaleString('en-US'),
          "E25": (Math.round(this.E25)).toLocaleString('en-US'),
          "E27": (Math.round(this.E27)).toLocaleString('en-US'),
          "E29": (Math.round(this.E29)).toLocaleString('en-US'),
          "E31": (Math.round(this.E31)).toLocaleString('en-US'),
          "E38": (Math.round(this.E38)).toLocaleString('en-US'),
          "E40": (Math.round(this.E40)).toLocaleString('en-US'),
          "E47": (Math.round(this.E47)).toLocaleString('en-US'),
          "E49": (Math.round(this.E49)).toLocaleString('en-US'),
          "E56": (Math.round(this.E56)).toLocaleString('en-US'),
          "E58": (Math.round(this.E58)).toLocaleString('en-US'),
          "E60": (Math.round(this.E60)).toLocaleString('en-US'),
          "E62": (Math.round(this.E62)).toLocaleString('en-US'),
          "F8": (Math.round(this.F8)).toLocaleString('en-US'),
          "F10": (Math.round(this.F10)).toLocaleString('en-US'),
          "F12": (Math.round(this.F12)).toLocaleString('en-US'),
          "F14": (Math.round(this.F14)).toLocaleString('en-US'),
          "F16": (Math.round(this.F16)).toLocaleString('en-US'),
          "F23": (Math.round(this.F23)).toLocaleString('en-US'),
          "F25": (Math.round(this.F25)).toLocaleString('en-US'),
          "F27": (Math.round(this.F27)).toLocaleString('en-US'),
          "F29": (Math.round(this.F29)).toLocaleString('en-US'),
          "F31": (Math.round(this.F31)).toLocaleString('en-US'),
          "F38": (Math.round(this.F38)).toLocaleString('en-US'),
          "F40": (Math.round(this.F40)).toLocaleString('en-US'),
          "F47": (Math.round(this.F47)).toLocaleString('en-US'),
          "F49": (Math.round(this.F49)).toLocaleString('en-US'),
          "F56": (Math.round(this.F56)).toLocaleString('en-US'),
          "F58": (Math.round(this.F58)).toLocaleString('en-US'),
          "F60": (Math.round(this.F60)).toLocaleString('en-US'),
          "F62": (Math.round(this.F62)).toLocaleString('en-US'),
          "returnOfinvest": (Math.round(this.rtnofInvest).toLocaleString('en-US')),
          "returnOfinvestDis5Y": (Math.round(this.rtnofInvestDis5Y)).toLocaleString('en-US'),

          "country": (this.roiForm.get('country').value.name),
          "industry": (this.roiForm.get('industry').value).toLocaleString('en-US'),
          "expectedDevice": (this.roiForm.get('expectedDevice').value).toLocaleString('en-US'),
        }
        localStorage.setItem('storeData5Y', JSON.stringify(this.storeData5Y))

 this.D70=this.roiForm.get('currentDevice').value
      }
    }

  }
}
