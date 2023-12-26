import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicDashboardCardWidgetComponent } from './clinic-dashboard-card-widget.component';

describe('ClinicDashboardCardWidgetComponent', () => {
  let component: ClinicDashboardCardWidgetComponent;
  let fixture: ComponentFixture<ClinicDashboardCardWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClinicDashboardCardWidgetComponent]
    });
    fixture = TestBed.createComponent(ClinicDashboardCardWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
