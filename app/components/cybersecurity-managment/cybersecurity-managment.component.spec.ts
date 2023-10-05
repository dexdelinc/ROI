import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CybersecurityManagmentComponent } from './cybersecurity-managment.component';

describe('CybersecurityManagmentComponent', () => {
  let component: CybersecurityManagmentComponent;
  let fixture: ComponentFixture<CybersecurityManagmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CybersecurityManagmentComponent]
    });
    fixture = TestBed.createComponent(CybersecurityManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
