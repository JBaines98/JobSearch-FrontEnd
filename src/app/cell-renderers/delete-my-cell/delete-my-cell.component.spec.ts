import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMyCellComponent } from './delete-my-cell.component';

describe('DeleteMyCellComponent', () => {
  let component: DeleteMyCellComponent;
  let fixture: ComponentFixture<DeleteMyCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteMyCellComponent]
    });
    fixture = TestBed.createComponent(DeleteMyCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
