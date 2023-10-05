import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreaseSupplyComponent } from './increase-supply.component';

describe('IncreaseSupplyComponent', () => {
  let component: IncreaseSupplyComponent;
  let fixture: ComponentFixture<IncreaseSupplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncreaseSupplyComponent]
    });
    fixture = TestBed.createComponent(IncreaseSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
