import { TestBed } from '@angular/core/testing';

import { WashtoolService } from './washtool.service';

describe('WashtoolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WashtoolService = TestBed.get(WashtoolService);
    expect(service).toBeTruthy();
  });
});
