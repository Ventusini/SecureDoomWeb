import { TestBed, inject } from '@angular/core/testing';

import { StreetserviceService } from './streetservice.service';

describe('StreetserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StreetserviceService]
    });
  });

  it('should be created', inject([StreetserviceService], (service: StreetserviceService) => {
    expect(service).toBeTruthy();
  }));
});
