import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalCallToActionComponent } from './final-call-to-action.component';

describe('FinalCallToActionComponent', () => {
  let component: FinalCallToActionComponent;
  let fixture: ComponentFixture<FinalCallToActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalCallToActionComponent]
    });
    fixture = TestBed.createComponent(FinalCallToActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
