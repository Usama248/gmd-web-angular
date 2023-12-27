import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-chart-review',
  standalone: true,
  imports: [
    CommonModule],
  templateUrl: './chart-review.component.html',
  styleUrls: ['./chart-review.component.scss']
})
export class ChartReviewComponent {
  ngOnInit(): void {

  }
  activeTab: string = 'activeConversation'
  visible: boolean = false

  products: any = [
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
    }
  ]
  cities: any = [
    {
      name: 'Karachi',
    },
    {
      name: 'Lahore',
    },
    {
      name: 'Islamabad',
    },
  ]
  conversationTab(a: string) {
    this.activeTab = a
  }
  showDialog() {
    this.visible = !this.visible
  }
}
