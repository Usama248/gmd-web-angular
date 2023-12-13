import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDueComponent } from './payment-due.component';

describe('PaymentDueComponent', () => {
  let component: PaymentDueComponent;
  let fixture: ComponentFixture<PaymentDueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaymentDueComponent]
    });
    fixture = TestBed.createComponent(PaymentDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
