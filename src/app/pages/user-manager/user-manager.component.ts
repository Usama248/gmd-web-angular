import { Component } from '@angular/core';



@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [],
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent {
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
