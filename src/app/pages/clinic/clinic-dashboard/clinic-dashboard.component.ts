import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-clinic-dashboard',
  standalone: true,
  imports: [CommonModule,CardModule,TableModule ],
  templateUrl: './clinic-dashboard.component.html',
  styleUrls: ['./clinic-dashboard.component.scss']
})
export class ClinicDashboardComponent {
products:any = [
  {
    name:'asdfs',
    code:'dsfasd',
    category:'safdaf',
    quantity:"dsfasd"
  }
]
}
