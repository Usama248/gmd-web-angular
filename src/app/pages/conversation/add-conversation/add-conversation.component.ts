import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
@Component({
  selector: 'app-add-conversation',
  standalone: true,
  imports: [CommonModule,ButtonModule,FormsModule,DialogModule, InputTextModule, InputTextareaModule, DropdownModule, RadioButtonModule, ReactiveFormsModule],
  templateUrl: './add-conversation.component.html',
  styleUrls: ['./add-conversation.component.scss']
})
export class AddConversationComponent {
isShow = false;
constructor() {}

ingredient!: string;
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
}
