import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';


@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputTextareaModule,
    ButtonModule,
    RadioButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule],
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
