import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfJobsSavedComponent } from './number-of-jobs-saved.component';

describe('NumberOfJobsSavedComponent', () => {
  let component: NumberOfJobsSavedComponent;
  let fixture: ComponentFixture<NumberOfJobsSavedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberOfJobsSavedComponent]
    });
    fixture = TestBed.createComponent(NumberOfJobsSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
