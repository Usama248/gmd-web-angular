import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ClinicService } from 'src/app/services/clinic-service/clinic.service';
import { ClinicDashboardModel } from 'src/app/models/clinic/clinic-dashboard-model';
import { TagModule } from 'primeng/tag';
import { ClinicianDocumentsEnumNames, ClinicianDocumentsEnumTagColors } from 'src/app/enums/clinician-documents-enum';

@Component({
  selector: 'app-clinic-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, TagModule],
  templateUrl: './clinic-dashboard.component.html',
  styleUrls: ['./clinic-dashboard.component.scss']
})
export class ClinicDashboardComponent implements OnInit {
  dashboardData : ClinicDashboardModel | undefined;
  CLINICIAN_DODUMENTS_ENUM_NAMES$ = ClinicianDocumentsEnumNames;
  CLINICIAN_DODUMENTS_ENUM_COLORS$ = ClinicianDocumentsEnumTagColors;

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
