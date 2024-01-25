import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ClinicService } from 'src/app/services/clinic-service/clinic.service';
import { ClinicDashboardModel } from 'src/app/models/clinic/clinic-dashboard-model';
import { TagModule } from 'primeng/tag';
import { ClinicianDocumentsEnumNames, ClinicianDocumentsEnumTagColors } from 'src/app/shared/constants/enums/clinician-documents-enum';
import { ClinicianRequestStatusNames, ClinicianRequestStatusTagColors } from 'src/app/shared/constants/enums/clinician-request-status-enum';
import { GridNoDataFoundSvgTemplateComponent } from 'src/app/shared/components/grid-no-data-found-svg-template/grid-no-data-found-svg-template.component';

@Component({
  selector: 'app-clinic-dashboard',
  standalone: true,
  imports: [DatePipe, CardModule, TableModule, TagModule, GridNoDataFoundSvgTemplateComponent],
  templateUrl: './clinic-dashboard.component.html',
  styleUrls: ['./clinic-dashboard.component.scss']
})
export class ClinicDashboardComponent implements OnInit {
  dashboardData : ClinicDashboardModel | undefined;
  CLINICIAN_DODUMENTS_ENUM_NAMES$ = ClinicianDocumentsEnumNames;
  CLINICIAN_DODUMENTS_ENUM_COLORS$ = ClinicianDocumentsEnumTagColors;
  CLINICIAN_REQUEST_STATUS_ENUM_NAMES$ = ClinicianRequestStatusNames;
  CLINICIAN_REQUEST_STATUS_ENUM_COLORS$ = ClinicianRequestStatusTagColors;

  constructor(private clinicService: ClinicService) {
     this.clinicService.getClinicDashboardData().subscribe({
      next : res => {
        this.dashboardData = res.data;
      },
      error: err => {
        console.log(err);
      }
     });
  }
  ngOnInit(): void {
    console.log();
  }
}
