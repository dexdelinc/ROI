import { Component, OnInit, isDevMode } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tab: any;
  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;
  tab5: any;
  tab6: any;
  tab7: any;
  tab8: any;
  tab9: any;
  title = 'roi-calculator';
  isHighlighted: boolean=false;
  constructor(public router:Router){

  }
  ngOnInit() {
    let obj = {
      cores: 1,
      expectedDevice: 200000,
      currentDevice: 100000,
    };
    localStorage.setItem('baseValues',JSON.stringify(obj))
    this.router.navigate(['roi-calculator'])
    this.onChange(1)
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }
  }
  onChange(check: any) {
    //    console.log(check);
    if (check === 1) {
      this.tab = 'tab1';
    } else if (check === 2) {
      this.tab = 'tab2';
    } else if (check === 3){
      this.tab = 'tab3';
    }else if(check === 4){
      this.tab = 'tab4';
    }else if(check === 5){
      this.tab = 'tab5';
    }else if(check === 6){
      this.tab = 'tab6';
    }else if(check === 7){
      this.tab = 'tab7';
    }else if(check === 8){
      this.tab = 'tab8';
    }else if(check === 9){
      this.tab = 'tab9';
    }
    else{
      this.tab='tab1'
    }
  }
  toggleStyle() {
    this.isHighlighted = !this.isHighlighted;
    console.log(this.isHighlighted);

  }
}
