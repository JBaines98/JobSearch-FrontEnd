import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridTitleComponent } from './grid-title.component';

describe('GridTitleComponent', () => {
  let component: GridTitleComponent;
  let fixture: ComponentFixture<GridTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridTitleComponent]
    });
    fixture = TestBed.createComponent(GridTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
