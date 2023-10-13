import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchParameterNameComponent } from './search-parameter-name.component';

describe('SearchParameterNameComponent', () => {
  let component: SearchParameterNameComponent;
  let fixture: ComponentFixture<SearchParameterNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchParameterNameComponent]
    });
    fixture = TestBed.createComponent(SearchParameterNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
