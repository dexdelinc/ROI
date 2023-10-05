import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RoiCalculatorComponent } from './components/roi-calculator/roi-calculator.component';
import { BvaOverviewComponent } from './components/bva-overview/bva-overview.component';
import { OptimizeOperationsComponent } from './components/optimize-operations/optimize-operations.component';
import { SimplifyRegularityComponent } from './components/simplify-regularity/simplify-regularity.component';
import { MarketAverageComponent } from './components/market-average/market-average.component';
import { CreditsComponent } from './components/credits/credits.component';
import { CybersecurityManagmentComponent } from './components/cybersecurity-managment/cybersecurity-managment.component';
import { DevlopSpecializedComponent } from './components/devlop-specialized/devlop-specialized.component';
import { AppRoutingModule } from './app-routing.module';
import { IncreaseSupplyComponent } from './components/increase-supply/increase-supply.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './shared/loader/loader.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { OpendialogComponent } from './shared/opendialog/opendialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule,Routes } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { HighchartsChartModule } from 'highcharts-angular';
import { ToastrModule } from 'ngx-toastr';
import { DatePipePipe } from './_pipes/date-pipe.pipe';

const routes:Routes=[]
@NgModule({
  declarations: [
    AppComponent,
    RoiCalculatorComponent,
    BvaOverviewComponent,
    OptimizeOperationsComponent,
    SimplifyRegularityComponent,
    MarketAverageComponent,
    CreditsComponent,
    CybersecurityManagmentComponent,
    DevlopSpecializedComponent,
    IncreaseSupplyComponent,
    LoaderComponent,
    OpendialogComponent,
    DatePipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectCountryModule.forRoot('de'),
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule, 
    MatDialogModule,
   MatProgressSpinnerModule,
   MatButtonToggleModule,
    NgxSpinnerModule,
    NgChartsModule,
    HighchartsChartModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-center',
        preventDuplicates: true,
        closeButton: true,
        progressBar: true,
        enableHtml: true,
        timeOut: 3000,
        extendedTimeOut: 2000,
        tapToDismiss: false,
        toastClass: 'ngx-toastr',
        titleClass: 'ngx-toastr-title',
        messageClass: 'ngx-toastr-message',

      }
    ),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }) 
    
  
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
