import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfSearchesSavedComponent } from './number-of-searches-saved.component';

describe('NumberOfSearchesSavedComponent', () => {
  let component: NumberOfSearchesSavedComponent;
  let fixture: ComponentFixture<NumberOfSearchesSavedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberOfSearchesSavedComponent]
    });
    fixture = TestBed.createComponent(NumberOfSearchesSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
