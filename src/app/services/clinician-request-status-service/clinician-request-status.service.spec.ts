import { TestBed } from '@angular/core/testing';

import { ClinicianRequestStatusService } from './clinician-request-status.service';

describe('ClinicianRequestStatusService', () => {
  let service: ClinicianRequestStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicianRequestStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
