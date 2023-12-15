import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-physician',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.scss']
})
export class PhysicianComponent implements OnInit {
  productsData = [
    {
      PhysicianName: "fdsfsd",
      CreatedDate: "fdsfsd",
      AssignedRoles: "fdsfsd",
      AssignmentType: "fdsfsd",
      Status: "fdsfsd",
      Action: "fdsfsd",
    },
    {
      PhysicianName: "adsfsd",
      CreatedDate: "sfsd",
      AssignedRoles: "dsfsd",
      AssignmentType: "xdsfsd",
      Status: "xdsfsd",
      Action: "bdsfsd",
    },
    {
      PhysicianName: "adsfsd",
      CreatedDate: "sfsd",
      AssignedRoles: "dsfsd",
      AssignmentType: "xdsfsd",
      Status: "xdsfsd",
      Action: "bdsfsd",
    },
    {
      PhysicianName: "adsfsd",
      CreatedDate: "sfsd",
      AssignedRoles: "dsfsd",
      AssignmentType: "xdsfsd",
      Status: "xdsfsd",
      Action: "bdsfsd",
    },
    {
      PhysicianName: "adsfsd",
      CreatedDate: "sfsd",
      AssignedRoles: "dsfsd",
      AssignmentType: "xdsfsd",
      Status: "xdsfsd",
      Action: "bdsfsd",
    },
    {
      PhysicianName: "adsfsd",
      CreatedDate: "sfsd",
      AssignedRoles: "dsfsd",
      AssignmentType: "xdsfsd",
      Status: "xdsfsd",
      Action: "bdsfsd",
    },
    {
      PhysicianName: "adsfsd",
      CreatedDate: "sfsd",
      AssignedRoles: "dsfsd",
      AssignmentType: "xdsfsd",
      Status: "xdsfsd",
      Action: "bdsfsd",
    },
    {
      PhysicianName: "adsfsd",
      CreatedDate: "sfsd",
      AssignedRoles: "dsfsd",
      AssignmentType: "xdsfsd",
      Status: "xdsfsd",
      Action: "bdsfsd",
    },
    {
      PhysicianName: "adsfsd",
      CreatedDate: "sfsd",
      AssignedRoles: "dsfsd",
      AssignmentType: "xdsfsd",
      Status: "xdsfsd",
      Action: "bdsfsd",
    },
    {
      PhysicianName: "adsfsd",
      CreatedDate: "sfsd",
      AssignedRoles: "dsfsd",
      AssignmentType: "xdsfsd",
      Status: "xdsfsd",
      Action: "bdsfsd",
    },
    {
      PhysicianName: "adsfsd",
      CreatedDate: "sfsd",
      AssignedRoles: "dsfsd",
      AssignmentType: "xdsfsd",
      Status: "xdsfsd",
      Action: "bdsfsd",
    },
    {
      PhysicianName: "adsfsd",
      CreatedDate: "sfsd",
      AssignedRoles: "dsfsd",
      AssignmentType: "xdsfsd",
      Status: "xdsfsd",
      Action: "bdsfsd",
    }
  ]
  products: any = [];
  total = 0;
  loading = false;
  ngOnInit(): void {
   this.products = this.productsData;
   this.loading = true;
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
    this.products = this.productsData;
    setTimeout(() => {
      this.products = this.products.slice(event.first);
      if(event.sortField) {
        this.products = this.products.sort((a : any, b: any) => a.PhysicianName.localeCompare(b.PhysicianName));
      }
      this.loading = false;
      this.total = this.productsData.length;
    }, 1000);
  }

}


