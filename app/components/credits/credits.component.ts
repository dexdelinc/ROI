import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  obj:any
  data:any
  USERS = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'sincere@april.biz',
      phone: '1-770-736-8031 x56442',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'shanna@melissa.tv',
      phone: '010-692-6593 x09125',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'nathan@yesenia.net',
      phone: '1-463-123-4447',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'julianne@kory.org',
      phone: '493-170-9623 x156',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'lucio@annie.ca',
      phone: '(254)954-1289',
    },
    {
      id: 6,
      name: 'Mrs. Dennis',
      email: 'karley@jasper.info',
      phone: '1-477-935-8478 x6430',
    },
  ];
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

  constructor() {}
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
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }


}
