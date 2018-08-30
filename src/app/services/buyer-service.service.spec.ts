import { TestBed, inject } from '@angular/core/testing';

import { BuyerServiceService } from './buyer-service.service';

describe('BuyerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuyerServiceService]
    });
  });

  it('should be created', inject([BuyerServiceService], (service: BuyerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
