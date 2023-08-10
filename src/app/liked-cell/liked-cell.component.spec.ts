import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedCellComponent } from './liked-cell.component';

describe('LikedCellComponent', () => {
  let component: LikedCellComponent;
  let fixture: ComponentFixture<LikedCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LikedCellComponent]
    });
    fixture = TestBed.createComponent(LikedCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
