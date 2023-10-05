import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplifyRegularityComponent } from './simplify-regularity.component';

describe('SimplifyRegularityComponent', () => {
  let component: SimplifyRegularityComponent;
  let fixture: ComponentFixture<SimplifyRegularityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimplifyRegularityComponent]
    });
    fixture = TestBed.createComponent(SimplifyRegularityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
