import { TestBed, inject } from '@angular/core/testing';

import { SubManagerService } from './sub-manager.service';

describe('SubManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubManagerService]
    });
  });

  it('should be created', inject([SubManagerService], (service: SubManagerService) => {
    expect(service).toBeTruthy();
  }));
});
