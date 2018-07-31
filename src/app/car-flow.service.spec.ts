import { TestBed, inject } from '@angular/core/testing';

import { CarFlowService } from './car-flow.service';

describe('CarFlowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarFlowService]
    });
  });

  it('should be created', inject([CarFlowService], (service: CarFlowService) => {
    expect(service).toBeTruthy();
  }));
});
