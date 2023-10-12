import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaIconsComponent } from './social-media-icons.component';

describe('SocialMediaIconsComponent', () => {
  let component: SocialMediaIconsComponent;
  let fixture: ComponentFixture<SocialMediaIconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialMediaIconsComponent]
    });
    fixture = TestBed.createComponent(SocialMediaIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
