import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionCirclesComponent } from './instruction-circles.component';

describe('InstructionCirclesComponent', () => {
  let component: InstructionCirclesComponent;
  let fixture: ComponentFixture<InstructionCirclesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructionCirclesComponent]
    });
    fixture = TestBed.createComponent(InstructionCirclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
