import { TestBed } from '@angular/core/testing';

import { CleanService } from './clean.service';

describe('CleanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CleanService = TestBed.get(CleanService);
    expect(service).toBeTruthy();
  });
});
