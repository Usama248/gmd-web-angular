import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';

@Component({
  selector: 'app-physician',
  standalone: true,
  imports: [CommonModule,TableModule, ButtonModule,LoaderComponent],
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.scss']
})
export class PhysicianComponent {
products:any = [
  {
    PhysicianName:"fdsfsd",
    CreatedDate:"fdsfsd",
    AssignedRoles:"fdsfsd",
    AssignmentType:"fdsfsd",
    Status:"fdsfsd",
    Action:"fdsfsd",
  },
  {
    PhysicianName:"adsfsd",
    CreatedDate:"sfsd",
    AssignedRoles:"dsfsd",
    AssignmentType:"xdsfsd",
    Status:"xdsfsd",
    Action:"bdsfsd",
  }
]
}


