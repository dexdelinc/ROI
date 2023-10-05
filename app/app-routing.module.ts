import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoiCalculatorComponent } from './components/roi-calculator/roi-calculator.component';
import { BvaOverviewComponent } from './components/bva-overview/bva-overview.component';
import { CybersecurityManagmentComponent } from './components/cybersecurity-managment/cybersecurity-managment.component';
import { OptimizeOperationsComponent } from './components/optimize-operations/optimize-operations.component';
import { IncreaseSupplyComponent } from './components/increase-supply/increase-supply.component';
import { DevlopSpecializedComponent } from './components/devlop-specialized/devlop-specialized.component';
import { SimplifyRegularityComponent } from './components/simplify-regularity/simplify-regularity.component';
import { MarketAverageComponent } from './components/market-average/market-average.component';
import { CreditsComponent } from './components/credits/credits.component';

const routes: Routes = [
  {
    path:'',
   redirectTo:'roi-calculator',
   pathMatch:'full',

  },
 
  {
    path:'roi-calculator',
    component:RoiCalculatorComponent
  },
  {
    path:'bav-overview',
    component:BvaOverviewComponent
  },
  {
    path:'cyber-manger',
    component:CybersecurityManagmentComponent
  },
  {
    path:'optimize-opr',
    component:OptimizeOperationsComponent
  },
  {
    path:'inc-supply',
    component:IncreaseSupplyComponent
  },
  {
    path:'dev-specialized',
    component:DevlopSpecializedComponent
  },
  {
    path:'simplify-reg',
    component:SimplifyRegularityComponent
  },
  {
    path:'market-avg',
    component:MarketAverageComponent
  },
  {
    path:'credits',
    component:CreditsComponent
  }

]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {
  static forRoot(routes: any, arg1: { useHash: boolean; }): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
    throw new Error('Method not implemented.');
  }
}