import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCellMapComponent } from './my-cell-map.component';

describe('MyCellMapComponent', () => {
  let component: MyCellMapComponent;
  let fixture: ComponentFixture<MyCellMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCellMapComponent]
    });
    fixture = TestBed.createComponent(MyCellMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
