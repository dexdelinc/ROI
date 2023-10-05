import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoiCalculatorComponent } from './roi-calculator.component';

describe('RoiCalculatorComponent', () => {
  let component: RoiCalculatorComponent;
  let fixture: ComponentFixture<RoiCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoiCalculatorComponent]
    });
    fixture = TestBed.createComponent(RoiCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
