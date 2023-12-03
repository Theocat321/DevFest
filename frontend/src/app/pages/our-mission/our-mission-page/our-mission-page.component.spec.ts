import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurMissionPageComponent } from './our-mission-page.component';

describe('OurMissionPageComponent', () => {
  let component: OurMissionPageComponent;
  let fixture: ComponentFixture<OurMissionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurMissionPageComponent]
    });
    fixture = TestBed.createComponent(OurMissionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
