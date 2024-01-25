import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormBuilder, FormControl, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConversationService } from 'src/app/services/conversation/conversation.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import {CreateConversationRequestModel} from 'src/app/models/conversation/create-conversation-request-model'
import { ErrorMessagesComponent } from "../../../shared/components/error-messages/error-messages.component";

@Component({
  selector: 'app-add-conversation',
  standalone: true,
  imports: [CommonModule,ButtonModule,FormsModule,DialogModule, InputTextModule, InputTextareaModule, DropdownModule, RadioButtonModule, ReactiveFormsModule,ErrorMessagesComponent],
  templateUrl: './add-conversation.component.html',
  styleUrls: ['./add-conversation.component.scss']
})
export class AddConversationComponent {
isShow = false;
constructor(private conversationService: ConversationService,private authService: AuthService,private formBuilder: FormBuilder) {}

@Output() formSubmit: EventEmitter<CreateConversationRequestModel> = new EventEmitter();

physicians:any[] = [];
selectedphysician:number = 0;
physicianRoles:any[] = [];
conversationForm: FormGroup = new FormGroup({
  conversationRouteType: new FormControl(false),
  title: new FormControl(''),
  physician:new FormControl(''),
  message:new FormControl('')
});

ngOnInit(): void {
  this.getPhysicians();
  this.conversationForm = this.formBuilder.group(
    {
      conversationRouteType: [
        false,
        [
          Validators.required
        ]
      ],
      title: [
        '',
        [
          Validators.required
        ]
      ],
      physician:[
        '',
        [
          Validators.required
        ]
      ],
      message:['',[]]
    }
  );
}
getPhysicians(){
  this.conversationService.getPhyscians().subscribe(res =>{
    if(res?.data){
      res?.data.forEach((element:any) => {
        this.physicians.push({name:element.text,value:element.value});
      });
    }
  });
}

getPhysicianRolesById(){
  let clinicId = this.authService.getUserData?.clinic_id;
  this.selectedphysician = this.conversationForm.get('physician')?.value;
  if(this.conversationForm.get('physician')?.value)
  {
    this.conversationService.getPhysicianRolesById(this.selectedphysician,clinicId).subscribe(res =>{
      if(res)
      {
          this.physicianRoles = res;
      }
    });
  }
}
getControl(keyOrPath: string): FormControl {
  return this.conversationForm.get(keyOrPath) as FormControl;
}
}
