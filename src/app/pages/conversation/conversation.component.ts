import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';



@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputTextareaModule,
    ButtonModule,
    RadioButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    TabViewModule],
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {
  ngOnInit(): void {

  }
  activeTab: string = 'activeConversation'
  visible: boolean = false
  ingredient!: string;
  products: any = [
    {
      Title: "Title 1",
      PhysicianName: "Physician 1",
      ConversationUser: "user",
      CreatorName: "Maaz",
      Status: "",
      Action: "",
    },
    {
      Title: "Title 2",
      PhysicianName: "Physician 2",
      ConversationUser: "user",
      CreatorName: "Ali",
      Status: "",
      Action: "",
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










