import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { OpendialogComponent } from 'src/app/shared/opendialog/opendialog.component';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { CategoryScale, ChartConfiguration, Chart, LineController, LineElement, LinearScale, PointElement } from 'chart.js';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import * as Highcharts from 'highcharts';
import { EmailService } from 'src/app/_services/email/email.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
const sgEmail = environment.sgEmail
const sgEmailCC = environment.sgEmailCC
@Component({
  selector: 'app-bva-overview',
  templateUrl: './bva-overview.component.html',
  styleUrls: ['./bva-overview.component.css'],
  animations: [
    trigger('fillAnimation', [
      state('initial', style({ transform: 'scaleX(0)' })),
      state('filled', style({ transform: 'scaleX(1)' })),
      transition('initial => filled', animate('1200ms ease-out')),
      transition('filled => initial', animate('1200ms ease-out')),
    ]),
  ],
})
export class BvaOverviewComponent implements OnInit {
  emailForm!: FormGroup;
  animationState = 'initial';
  @ViewChild('htmlData') htmlData!: ElementRef;
  obj: any = {}
  data: any;
  chart: any = null
  rtnofInvestDis: any;
  rtnofInvestDis5Y: any;
  currentDevice:any;
  submitted: boolean = false;
  drafts: any[] = [];
  color = `warn`;
  mode: ProgressSpinnerMode = 'determinate';
  items: any = [
    { value: 80, text: "Improve Cybersecurity Management Efficiency and Effectiveness" },
    { value: 50, text: "Optimize Network Operations, Performance Management, and Uptime" },
    { value: 80, text: "Increase Supply Chain Efficiency" },
    { value: 60, text: "Develop Specialized Organizational Knowledge and Skills" },
    { value: 33, text: "Simplify Regulatory Compliance	" },

  ]
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [70, 30], label: '' },


  ];
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false, // Set to false if you want to control the aspect ratio

    animation: {
      animateRotate: true, // Animate rotation
      animateScale: false, // Animate scaling
    },

  };
  type: number = 1;
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
  @ViewChild('closebutton') closebutton: any;
  data5Y: any;
  constructor(private toast: ToastrService, private emailService: EmailService, private httpClient: HttpClient, private dialog: MatDialog, private formBuilder: FormBuilder, private spinner: NgxSpinnerService,) {
    Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);
  }
  ngOnInit() {
    this.checkOnlineStatus()
      let item=localStorage.getItem('storeData')
      this.obj=item
          this.data=JSON.parse(this.obj)
          console.log(this.data);
        item=localStorage.getItem('storeData5Y')
          this.obj=item
          this.data5Y=JSON.parse(this.obj)
          console.log(this.data);
    

    this.rtnofInvestDis = this.data.returnOfinvestDis
    this.rtnofInvestDis5Y = this.data.returnOfinvestDis5Y
    this.currentDevice=this.data.D70
    if (this.chart != null) {
      this.chart.destroy()
    }
    console.log(this.data);
    this.rtnofInvestDis = parseInt(this.data.returnOfinvestDis)
    console.log(this.rtnofInvestDis);
    this.createEmailForm()
    setTimeout(() => {
      this.animationState = 'filled'; // Trigger the initial filling animation
    }, 100);
  }

  createEmailForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      company: ['', [Validators.required]]
    },
    );
  }
  get f() { return this.emailForm.controls; }
  openDialog(e: any) {
    // const dialogRef = this.dialog.open(OpendialogComponent,{
    //   width: '800px',
    //   data:e
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  checkOnlineStatus() {
    if (navigator.onLine) {
      console.log('online');
      const storedDrafts = localStorage.getItem('emailDrafts');
      if (storedDrafts) {
        this.drafts = JSON.parse(storedDrafts);
        this.sendSavedDrafts();
      }
    } else {
      console.log('offline');

      this.loadDraftsFromLocalStorage();
    }
  }
  sendSavedDrafts() {
    console.log(this.saveDraft);

    this.drafts.forEach((draft) => {
      this.emailService.sendEmail(draft).subscribe({
        next: data => {
          console.log(data);
        }
      })
    });
    this.clearDrafts();
  }
  loadDraftsFromLocalStorage() {
    const storedDrafts = localStorage.getItem('emailDrafts');
    if (storedDrafts) {
      this.drafts = JSON.parse(storedDrafts);
    }
  }
  saveDraft(draftData: any) {
    try {
      this.drafts.push(draftData);
      localStorage.setItem('emailDrafts', JSON.stringify(this.drafts));
      this.spinner.hide()
      this.toast.success('Yoy are offline ,your email saved as draft')

    } catch (error: any) {
      this.spinner.hide()
      this.toast.error(error.message)

    }

  }

  clearDrafts() {
    this.drafts = [];
    localStorage.removeItem('emailDrafts');
  }
  sendEmail() {
    this.submitted = true;

    if (this.emailForm.invalid) {
      return
    } else {
      // this.spinner.show()
      this.openPdfPreview('');
      this.closebutton.nativeElement.click();
      this.selectedFile = null
      this.submitted = false
    }
  }

  public openPDF(): void {
    console.log(this.emailForm.get('email')?.value);

    var img = new Image()
    img.src = 'assets/icons/screenshot1.JPG'
    console.log(img)
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas: any) => {
      let fileWidth = 125;
      let fileHeight = (canvas.height * fileWidth) / canvas.width - 25;
      const FILEURI = canvas.toDataURL('image/jpeg', 0.3);
      let PDF = new jsPDF('p', 'mm', 'a4', true);
      let position = 0.2
      PDF.addImage(FILEURI, 'PNG', 10, position, fileWidth, fileHeight);
      // PDF.save('ROI.pdf');

      const pdfBuffer = PDF.output('arraybuffer');
      const pdfBase64 = this.arrayBufferToBase64(pdfBuffer);
      let object: any = {
        personalizations: [
          {
            to: [{ email: this.emailForm.get('email')?.value }],
          },
        ],
        from: { email: sgEmail },
        subject: `ROI Email to ${this.emailForm.get('company')?.value}`,
        content: [
          {
            type: 'text/plain',
            value: 'This is a email from ROI Department',
          },
        ], attachments: [
          {
            content: pdfBase64,
            filename: 'ROI.pdf',
            type: 'application/pdf',
            disposition: 'attachment',
          },
        ],
      }
      if (navigator.onLine) {
        this.emailService.sendEmail(object).subscribe({
          next: (res: any) => {
            console.log(res);
            this.spinner.hide()
            this.toast.success(res.message)
          }, error: err => {
            this.spinner.hide()
            this.toast.error(err.error.message)
          }
        })
      } else {
        console.log('offline');

        this.saveDraft(object);
      }

    });
  }

  toggleDuration(duration: number) {
    this.type = duration;
    if(this.type == 1){
      let item=localStorage.getItem('storeData')
      this.obj=item
          this.data=JSON.parse(this.obj)
          console.log(this.data);
      
    
    }else{
      let item=localStorage.getItem('storeData5Y')
      this.obj=item
      this.data=JSON.parse(this.obj)
      console.log(this.data);
    }
  }


  openPdfPreview(e: any) {
    // this.submitted = true
    let obj:any={
      file:this.selectedFile,
      companyName:this.emailForm.value
    }
    const dialogRef = this.dialog.open(OpendialogComponent, {
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Dialog result: ${result}`);
        this.spinner.show()
        let object: any = {
          personalizations: [
            {
              to: [{ email: this.emailForm.get('email')?.value }],
              cc: [{ email: sgEmailCC }],
            },
          ],
          from: { email: sgEmail },
          subject: `ROI Email to ${this.emailForm.get('company')?.value}`,
          content: [
            {
              type: 'text/plain',
              value: 'This is a email from ROI Department',
            },
          ], attachments: [
            {
              content: result,
              filename: 'ROI.pdf',
              type: 'application/pdf',
              disposition: 'attachment',
            },
          ],
        }
        if (navigator.onLine) {
          this.emailService.sendEmail(object).subscribe({
            next: (res: any) => {
              console.log(res);
              this.spinner.hide()
              this.toast.success(res.message)
            }, error: err => {
              this.spinner.hide()
              this.toast.error(err.error.message)
            }
          })
        } else {
          console.log('offline');

          this.saveDraft(object);
        }
      }else{
        return
      }
    });
  }
  selectedFile: File | null = null;

  onDragOver(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.handleFile(event.dataTransfer?.files[0]);
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.handleFile(inputElement.files?.[0]);
  }

  private handleFile(file: File | undefined): void {
    if (file) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null; // Clear the selected file if no file is chosen
    }
  }

  onClose(){
    this.selectedFile = null;
    this.closebutton.nativeElement.click();
  }
}
