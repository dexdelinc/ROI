import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevlopSpecializedComponent } from './devlop-specialized.component';

describe('DevlopSpecializedComponent', () => {
  let component: DevlopSpecializedComponent;
  let fixture: ComponentFixture<DevlopSpecializedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevlopSpecializedComponent]
    });
    fixture = TestBed.createComponent(DevlopSpecializedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
