import { TestBed, inject } from '@angular/core/testing';

import { OfertService } from './ofert.service';

describe('OfertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfertService]
    });
  });

  it('should be created', inject([OfertService], (service: OfertService) => {
    expect(service).toBeTruthy();
  }));
});
