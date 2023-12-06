import { TestBed } from '@angular/core/testing';

import { BrowserDetailsService } from './browser-details.service';

describe('BrowserDetailsService', () => {
  let service: BrowserDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
