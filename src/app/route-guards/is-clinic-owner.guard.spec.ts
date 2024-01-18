import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isClinicOwnerGuard } from './is-clinic-owner.guard';

describe('isClinicOwnerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isClinicOwnerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
