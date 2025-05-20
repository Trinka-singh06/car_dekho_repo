import { TestBed } from '@angular/core/testing';

import { CarsellService } from './carsell.service';

describe('CarsellService', () => {
  let service: CarsellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarsellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
