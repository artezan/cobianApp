import { TestBed, inject } from '@angular/core/testing';

import { AdviserService } from './adviser.service';

describe('AdviserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdviserService]
    });
  });

  it('should be created', inject([AdviserService], (service: AdviserService) => {
    expect(service).toBeTruthy();
  }));
});
