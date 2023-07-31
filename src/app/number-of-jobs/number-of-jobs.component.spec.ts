import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfJobsComponent } from './number-of-jobs.component';

describe('NumberOfJobsComponent', () => {
  let component: NumberOfJobsComponent;
  let fixture: ComponentFixture<NumberOfJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberOfJobsComponent]
    });
    fixture = TestBed.createComponent(NumberOfJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
