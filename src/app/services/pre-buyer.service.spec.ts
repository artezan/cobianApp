import { TestBed, inject } from '@angular/core/testing';

import { PreBuyerService } from './pre-buyer.service';

describe('PreBuyerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreBuyerService]
    });
  });

  it('should be created', inject([PreBuyerService], (service: PreBuyerService) => {
    expect(service).toBeTruthy();
  }));
});
