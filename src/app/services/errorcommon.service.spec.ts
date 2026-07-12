import { TestBed } from '@angular/core/testing';

import { ErrorcommonService } from './errorcommon.service';

describe('ErrorcommonService', () => {
  let service: ErrorcommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorcommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
