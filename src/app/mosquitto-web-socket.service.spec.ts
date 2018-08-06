import { TestBed, inject } from '@angular/core/testing';

import { MosquittoWebSocketService } from './mosquitto-web-socket.service';

describe('MosquittoWebSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MosquittoWebSocketService]
    });
  });

  it('should be created', inject([MosquittoWebSocketService], (service: MosquittoWebSocketService) => {
    expect(service).toBeTruthy();
  }));
});
