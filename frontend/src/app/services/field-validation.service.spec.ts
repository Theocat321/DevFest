import { TestBed } from '@angular/core/testing';

import { FieldValidationService } from './field-validation.service';

describe('PasswordValidationService', () => {
  let service: FieldValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
