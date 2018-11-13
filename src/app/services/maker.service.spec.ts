import { TestBed, inject } from '@angular/core/testing';

import { MakerService } from './maker.service';

describe('MakerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MakerService]
    });
  });

  it('should be created', inject([MakerService], (service: MakerService) => {
    expect(service).toBeTruthy();
  }));
});
