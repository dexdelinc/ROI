import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';
import * as Highcharts from 'highcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-opendialog',
  templateUrl: './opendialog.component.html',
  styleUrls: ['./opendialog.component.css'],
  animations: [
    trigger('fillAnimation', [
      state('initial', style({ transform: 'scaleX(0)' })),
      state('filled', style({ transform: 'scaleX(1)' })),
      transition('initial => filled', animate('1200ms ease-out')),
      transition('filled => initial', animate('1200ms ease-out')),
    ]),
  ],
})
export class OpendialogComponent {
  data: any;
  data5Y: any;
  animationState = 'initial';
  obj: any;
  obj5Y: any;
  current: any;
  expexted: any;
  pdfBase64!: any;
  done: boolean = false;
  data1 = [
    [0, 0],
    [1, 0.05],
    [2, 0.25],
    [3, 0.65],
    [4, 1.35],
    [5, 2.45],
  ];
  highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'spline',
      inverted: false,
      width: 700,
      height: 500,
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
        enabled: false,
      },
      accessibility: {
        rangeDescription: 'Range: 0 to 80 km.',
      },
      maxPadding: 0.05,
      showLastLabel: true,
    },
    yAxis: {
      title: undefined,
      labels: {
        enabled: false,
      },
      gridLineColor: '#ffffff',
      lineColor: '#ffffff',
      accessibility: {
        rangeDescription: 'Range: 0°C to 20°C.',
      },
      lineWidth: 0,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    credits: {
      enabled: false,
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
        },
      },
    },
    series: [
      {
        type: 'spline',
        data: this.data1,
        color: 'green',
      },
    ],
  };
  imagePreview: any;
  name = 'Southern Linc';

  constructor(
    private httpClient: HttpClient,
    public dialogRef: MatDialogRef<OpendialogComponent>,
    @Inject(MAT_DIALOG_DATA) public event: any,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.name = this.event.companyName.company;
    console.log(this.event);
    if (this.event.file != null) {
      if (this.event.file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target?.result;
        };
        reader.readAsDataURL(this.event.file);
      }
    }
    let item = localStorage.getItem('storeData');
    let item5Y = localStorage.getItem('storeData5Y');
    this.obj = item;
    this.obj5Y = item5Y;
    console.log(JSON.parse(this.obj).D70);
    this.data = JSON.parse(this.obj);
    console.log(this.data);

    this.data5Y = JSON.parse(this.obj5Y);
    this.current = parseInt(this.data.D70.replace(',', '')) / 1000;
    this.expexted = parseInt(this.data.expectedDevice.replace(',', '')) / 1000;

    setTimeout(() => {
      this.animationState = 'filled'; // Trigger the initial filling animation
    }, 100);
  }

  save() {
    this.spinner.show();
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageCount = 11; // Update with the number of pages you have
  
    const renderAndAddPage = async (pageNumber: number) => {
      if (pageNumber <= pageCount) {
        const elementId = `htmlData${pageNumber}`;
        const element = document.getElementById(elementId);
  
        if (element) {
          const canvas = await html2canvas(element, {
            scale: 1,
            imageTimeout: 0,
          });
  
          try {
            const imgData = canvas.toDataURL('image/jpeg', 0.2);
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
  
            // Add the page number text synchronously
            // pdf.setTextColor(0, 0, 0);
            // pdf.setFontSize(12);
            // pdf.text(`Page ${pageNumber}`, 10, pageHeight - 10);
  
            // Increment the page number and add the next page
            await renderAndAddPage(pageNumber + 1);
          } catch (error) {
            console.error('Error capturing content:', error);
            // Handle the error as needed
          }
        }
      } else {
        this.spinner.hide();
        // All pages have been added, delete the first empty page and save the PDF
        pdf.deletePage(1);
        pdf.save('ROI.pdf');
        const pdfBuffer = pdf.output('arraybuffer');
        this.pdfBase64 = this.arrayBufferToBase64(pdfBuffer);
        this.dialogRef.close(this.pdfBase64);
      }
    };
  
    // Start rendering and adding pages
    renderAndAddPage(1);
  }
  
  

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    this.done = true;
    return btoa(binary);
  }
}
