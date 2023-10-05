import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BvaOverviewComponent } from './bva-overview.component';

describe('BvaOverviewComponent', () => {
  let component: BvaOverviewComponent;
  let fixture: ComponentFixture<BvaOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BvaOverviewComponent]
    });
    fixture = TestBed.createComponent(BvaOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
