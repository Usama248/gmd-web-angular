import { TestBed } from '@angular/core/testing';

import { AgoraRtmService } from './agora-rtm.service';

describe('AgoraRtmService', () => {
  let service: AgoraRtmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgoraRtmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
