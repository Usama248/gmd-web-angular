import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userStateGuard } from './user-state.guard';

describe('userStateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userStateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
