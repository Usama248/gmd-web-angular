import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartReviewComponent } from './chart-review.component';

describe('ChartReviewComponent', () => {
  let component: ChartReviewComponent;
  let fixture: ComponentFixture<ChartReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChartReviewComponent]
    });
    fixture = TestBed.createComponent(ChartReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
