import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurMissionSectionComponent } from './our-mission-section.component';

describe('OurMissionSectionComponent', () => {
  let component: OurMissionSectionComponent;
  let fixture: ComponentFixture<OurMissionSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurMissionSectionComponent]
    });
    fixture = TestBed.createComponent(OurMissionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
