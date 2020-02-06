import { TestBed } from '@angular/core/testing';

import { CarWashService } from './car-wash.service';

describe('CarWashService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarWashService = TestBed.get(CarWashService);
    expect(service).toBeTruthy();
  });
});
