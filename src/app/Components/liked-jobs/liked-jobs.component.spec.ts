import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedJobsComponent } from './liked-jobs.component';

describe('LikedJobsComponent', () => {
  let component: LikedJobsComponent;
  let fixture: ComponentFixture<LikedJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LikedJobsComponent]
    });
    fixture = TestBed.createComponent(LikedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
