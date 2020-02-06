import { TestBed } from '@angular/core/testing';

import { TypecarService } from './typecar.service';

describe('TypecarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypecarService = TestBed.get(TypecarService);
    expect(service).toBeTruthy();
  });
});
