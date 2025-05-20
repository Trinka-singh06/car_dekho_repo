import { TestBed } from '@angular/core/testing';

import { CarSellRequestService } from './car-sell-request.service';

describe('CarSellRequestService', () => {
  let service: CarSellRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarSellRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
