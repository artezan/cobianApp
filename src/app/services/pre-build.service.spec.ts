import { TestBed, inject } from '@angular/core/testing';

import { PreBuildService } from './pre-build.service';

describe('PreBuildService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreBuildService]
    });
  });

  it('should be created', inject([PreBuildService], (service: PreBuildService) => {
    expect(service).toBeTruthy();
  }));
});
