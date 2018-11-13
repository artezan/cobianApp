import { TestBed, inject } from '@angular/core/testing';

import { StatusBuyerPropertyService } from './status-buyer-property.service';

describe('StatusBuyerPropertyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusBuyerPropertyService]
    });
  });

  it('should be created', inject([StatusBuyerPropertyService], (service: StatusBuyerPropertyService) => {
    expect(service).toBeTruthy();
  }));
});
