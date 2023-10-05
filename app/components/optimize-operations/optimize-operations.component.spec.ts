import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizeOperationsComponent } from './optimize-operations.component';

describe('OptimizeOperationsComponent', () => {
  let component: OptimizeOperationsComponent;
  let fixture: ComponentFixture<OptimizeOperationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptimizeOperationsComponent]
    });
    fixture = TestBed.createComponent(OptimizeOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
