import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketAverageComponent } from './market-average.component';

describe('MarketAverageComponent', () => {
  let component: MarketAverageComponent;
  let fixture: ComponentFixture<MarketAverageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketAverageComponent]
    });
    fixture = TestBed.createComponent(MarketAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
