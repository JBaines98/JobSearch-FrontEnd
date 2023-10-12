import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherJobSitesComponent } from './other-job-sites.component';

describe('OtherJobSitesComponent', () => {
  let component: OtherJobSitesComponent;
  let fixture: ComponentFixture<OtherJobSitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherJobSitesComponent]
    });
    fixture = TestBed.createComponent(OtherJobSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
