import { TestBed } from '@angular/core/testing';

import { EsAccountService } from './es-account.service';

describe('EsAccountService', () => {
  let service: EsAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
