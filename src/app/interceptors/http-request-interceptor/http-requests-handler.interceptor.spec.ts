import { TestBed } from '@angular/core/testing';

import { HttpRequestsHandlerInterceptor } from './http-requests-handler.interceptor';

describe('HttpRequestsHandlerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpRequestsHandlerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpRequestsHandlerInterceptor = TestBed.inject(HttpRequestsHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
