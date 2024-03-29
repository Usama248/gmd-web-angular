import { Component, OnInit,ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { AddConversationComponent } from './add-conversation/add-conversation.component';
import { ConversationModel } from '../../../app/models/conversation/conversation-model';
import { ConversationTypeEnumColor, ConversationTypeEnumNames } from '../../..//app/shared/constants/enums/conversation-type-enum';
import { TagModule } from 'primeng/tag';
import { ConversationService } from '../../../app/services/conversation/conversation.service';
import { UtcToLocalPipe } from "../../shared/pipes/utc-to-local.pipe";
import { ConversationChatComponent } from "./conversation-chat/conversation-chat.component";
import { AuthRepository } from '../../../app/services/auth-service/auth.repository';
import { UserProfileModel } from '../../../app/models/user/user-profile.model';
import { GridNoDataFoundSvgTemplateComponent } from '../../../app/shared/components/grid-no-data-found-svg-template/grid-no-data-found-svg-template.component';
import { SkeletonModule } from 'primeng/skeleton';
import { CreateConversationRequestModel } from 'src/app/models/conversation/create-conversation-request-model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { FormValidationService } from 'src/app/shared/services/form-validation.service';


@Component({
    selector: 'app-conversation',
    standalone: true,
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.scss'],
    imports: [
    TableModule,
    InputTextareaModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    TabViewModule,
    AddConversationComponent,
    DatePipe,
    TagModule,
    UtcToLocalPipe,
    ConversationChatComponent,
    GridNoDataFoundSvgTemplateComponent,
    SkeletonModule
]
})
export class ConversationComponent implements OnInit {
  conversations: ConversationModel[] = [];
  pastConversations:  ConversationModel[] = [];
  CONVERSATION_TYPE_ENUM_NAMES$ = ConversationTypeEnumNames;
  CONVERSATION_TYPE_ENUM_COLORS$ = ConversationTypeEnumColor;
  showPast = false;
  showChat = false;
  conversationToJoin:  any;
  loginUserInfo!: UserProfileModel;
  IsLoading = false;

  constructor(private conversationService: ConversationService, 
    private authRepo: AuthRepository,
    private authService: AuthService,
    private formValidationService: FormValidationService
     ) {
    this.authRepo.getLoginUserData().subscribe(res => {
      this.loginUserInfo = res;
    })
   }

   @ViewChild('addconversation') addconversation!: AddConversationComponent;

  ngOnInit(): void {
    this.showActiveConversations();
  }
  activeTab: string = 'activeConversation'
  visible = false;
  conversationTab(a: string) {
    this.activeTab = a
  }

  newConversation : CreateConversationRequestModel = {
    title:"",
    description:"",
    primaryPhysician:0,
    conversationRouteType:0,
    selectedClinicId:0,
    clinicId:0,
    useroffset:"",
    usertimezone:"",
    userId:"",
    conversationType:2,
    numericUserId:0
  }
  AddNewConversation() {
    this.visible = !this.visible;
  }
  showConversations(event: any) {
    if (event.index === 0) {
       this.showActiveConversations();
    } else {
      this.showPastConversations();
    }
  }
  showPastConversations() {
    this.IsLoading = true;
    this.showPast = true;
    this.conversationService.getAllConversataionsForClinic(true, this.authRepo.loginUserId).subscribe({
      next: (res : any) => {
        this.pastConversations = res.data.videoCalls;
        this.IsLoading = false;
      }, error: (err: any) => {
      }
    })
  }
  showActiveConversations() {
    this.showPast = false;
    this.conversationService.getAllConversataionsForClinic(false, this.authRepo.loginUserId).subscribe({
      next: res => {
        this.conversations = res.data.videoCalls;
      }, error: err => {
      }
    })
  }
  Close() {
    this.visible = false;
  } 
  JoinChat(conversation: ConversationModel) {
   this.conversationToJoin = conversation;
   this.showChat = true;
  }
  CloseChatDialog() {
    this.showChat = false;
  }

  submitForm(){
    if(this.addconversation.conversationForm.valid)
    {
      this.newConversation.description = this.addconversation.conversationForm.get("message")?.value;
      this.newConversation.title = this.addconversation.conversationForm.get("title")?.value;
      this.newConversation.primaryPhysician = this.addconversation.conversationForm.get("physician")?.value;
      this.newConversation.conversationRouteType = this.addconversation.conversationForm.get("conversationRouteType")?.value;
      this.newConversation.selectedClinicId =  this.authService.getUserData?.clinic_id;
      this.newConversation.clinicId =  this.authService.getUserData?.clinic_id;
      this.newConversation.usertimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.newConversation.useroffset = new Date().getTimezoneOffset().toString();
      this.newConversation.userId = this.authService.getUserData?.user_id;
      this.newConversation.numericUserId = this.authService.getUserData?.user_numeric_id;
      this.conversationService.postSaveRoomCall(this.newConversation).subscribe(res =>{
        if(res?.data)
        {
          this.Close();
          this.showActiveConversations();
        }
      });
    }
    else{
      this.formValidationService.markFieldsAsDirty(this.addconversation.conversationForm);

    }
  }
}










