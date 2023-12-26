import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clinic-dashboard-card-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clinic-dashboard-card-widget.component.html',
  styleUrls: ['./clinic-dashboard-card-widget.component.scss']
})
export class ClinicDashboardCardWidgetComponent {
@Input({required : true}) title: string | undefined;
@Input({required : true}) count: string | undefined;

}
