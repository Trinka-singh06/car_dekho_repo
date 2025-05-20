import { TestBed } from '@angular/core/testing';

import { UsedCarsService } from './used-cars.service';

describe('UsedCarsService', () => {
  let service: UsedCarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsedCarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
