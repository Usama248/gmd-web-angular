import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isClinicGuard } from './is-clinic.guard';

describe('isClinicGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isClinicGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
