import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SortEvent } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { ClinicianRequestStatusEnum, ClinicianRequestStatusNames, ClinicianRequestStatusTagColors } from 'src/app/shared/constants/enums/clinician-request-status-enum';
import { PhysicianAssignTypeNames, PhysicianAssignTypeTagColors } from 'src/app/shared/constants/enums/physician-assignment-type-enum';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ClinicianRequestStatusRepository } from 'src/app/services/clinician-request-status-service/clinician-request-status.repository';
import { IClinicianRequestStatus } from 'src/index-db/interfaces/clinician-request-status.interface';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { GridNoDataFoundSvgTemplateComponent } from 'src/app/shared/components/grid-no-data-found-svg-template/grid-no-data-found-svg-template.component';

@Component({
  selector: 'app-physician',
  standalone: true,
  imports: [DatePipe, FormsModule, InputTextModule, TableModule, ButtonModule, MenuModule, TagModule, MultiSelectModule, GridNoDataFoundSvgTemplateComponent],
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.scss']
})
export class PhysicianComponent implements OnInit, AfterViewInit {
  items:any
  CLINICIAN_REQUEST_STATUS_ENUM_NAMES$ = ClinicianRequestStatusNames;
  CLINICIAN_REQUEST_STATUS_ENUM_COLORS$ = ClinicianRequestStatusTagColors;
  PHYSICIAN_ASSIGN_TYPE_NAMES$ = PhysicianAssignTypeNames;
  PHYSICIA_ASSIGN_TYPE_TAG_COLORS$ = PhysicianAssignTypeTagColors;
  statusList : {
    label: any;
    value: ClinicianRequestStatusEnum;
   }[] = Object.keys(ClinicianRequestStatusEnum)
    .filter((key: any) => !isNaN(Number(ClinicianRequestStatusEnum[key])))
    .map((key: any) => ({ label: this.CLINICIAN_REQUEST_STATUS_ENUM_NAMES$.get(ClinicianRequestStatusEnum[key] as unknown as ClinicianRequestStatusEnum), value: + ClinicianRequestStatusEnum[key] as ClinicianRequestStatusEnum }));


  @ViewChild('dt2') dt: Table | undefined;

  constructor(private clinicianRequestStatusService: ClinicianRequestStatusRepository) { }
  ngAfterViewInit(): void {

  }
  clinicianRequests!: IClinicianRequestStatus[];
  loading = false;
  ngOnInit(): void {

    this.items = [

      {
          items: [
              {
                  label: 'View',
                  icon: 'pi pi-eye',
                  url: 'http://angular.io'
              },
          ]
      }
  ];

    this.loading = true;
    this.clinicianRequestStatusService.getClinicianRequestStatusData().subscribe(res => {
      if(res.length > 0) {
      this.clinicianRequests = res;
      this.loading = false;
      }
    })
    console.log(this.statusList);
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
  applyFilterGlobal($event: any, stringVal: string) {
    this.dt?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  clear(table: Table) {
    table.clear();
  }
  clickedd(val: any) {
    console.log(val);
  }
}


