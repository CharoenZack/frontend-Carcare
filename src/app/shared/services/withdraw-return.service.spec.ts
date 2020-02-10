import { TestBed } from '@angular/core/testing';

import { WithdrawReturnService } from './withdraw-return.service';

describe('WithdrawReturnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WithdrawReturnService = TestBed.get(WithdrawReturnService);
    expect(service).toBeTruthy();
  });
});
