import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SortEvent } from 'primeng/api';
import { ClinicianRequestStatusService } from 'src/app/services/clinician-request-status-service/clinician-request-status.service';
import { ClinicianRequestStatusModel } from 'src/app/models/clinician-request-status/clinician-request-status.model';
import { TagModule } from 'primeng/tag';
import { ClinicianRequestStatusRepository } from 'src/app/services/clinician-request-status-service/clinician-request-status.repository';

@Component({
  selector: 'app-physician',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule],
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.scss']
})
export class PhysicianComponent implements OnInit, AfterViewInit {
  clear(_t12: Table) {
    throw new Error('Method not implemented.');
  }
  constructor(private clinicianRequestStatusService: ClinicianRequestStatusService) { }
  ngAfterViewInit(): void {

  }
  clinicianRequests!: ClinicianRequestStatusModel[];
  loading = false;
  ngOnInit(): void {
    this.loading = true;
    this.clinicianRequestStatusService.getAllClinicianRequests().subscribe(res => {
      this.clinicianRequests = res.data;
      this.clinicianRequests.forEach((clinicianRequest) => (clinicianRequest.createdDate = new Date(clinicianRequest.createdDate)));
      this.loading = false;
    })
  }

  customSort(event: SortEvent) {
    event.data?.sort((data1, data2) => {
      let value1 = data1[event.field || ""];
      let value2 = data2[event.field || ""];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return (event.order || 1) * result;
    });
  }

  loadProducts(event: TableLazyLoadEvent) {
    this.loading = true;
    // this.products = this.productsData;
    setTimeout(() => {
      this.clinicianRequests = this.clinicianRequests.slice(event.first);
      if (event.sortField) {
        this.clinicianRequests = this.clinicianRequests.sort((a: any, b: any) => a.PhysicianName.localeCompare(b.PhysicianName));
      }
      this.loading = false;
      // this.total = this.productsData.length;
    }, 1000);
  }

  getRoles(input: string, delimiter: string): string[] {
    return input.split(delimiter);
  }
}


