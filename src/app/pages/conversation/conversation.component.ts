import { Component, OnInit } from '@angular/core';
import {  DatePipe, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { AddConversationComponent } from './add-conversation/add-conversation.component';
import { ConversationRepository } from 'src/app/services/conversation/conversation-repository';
import { ConversationModel } from 'src/app/models/conversation/conversation-model';
import { ConversationTypeEnumColor, ConversationTypeEnumNames } from 'src/app/shared/constants/enums/conversation-type-enum';
import { TagModule } from 'primeng/tag';
import { ConversationService } from 'src/app/services/conversation/conversation.service';
import { UtcToLocalPipe } from "../../shared/pipes/utc-to-local.pipe";
import { ConversationChatComponent } from "./conversation-chat/conversation-chat.component";
import { AuthRepository } from 'src/app/services/auth-service/auth.repository';
import { UserProfileModel } from 'src/app/models/user/user-profile.model';

@Component({
    selector: 'app-conversation',
    standalone: true,
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.scss'],
    imports: [
        NgIf,
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
        ConversationChatComponent
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

  constructor(private conversationService: ConversationService, private authRepo: AuthRepository) {
    this.authRepo.getLoginUserData().subscribe(res => {
      this.loginUserInfo = res;
    })
   }
  ngOnInit(): void {
    this.showActiveConversations();
  }
  activeTab: string = 'activeConversation'
  visible = false;
  conversationTab(a: string) {
    this.activeTab = a
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
    this.conversationService.getAllConversataionsForClinic(true, this.authRepo.loginUserId).subscribe({
      next: res => {
        this.pastConversations = res.data.videoCalls;
        this.showPast = true;
      }, error: err => {
      }
    })
  }
  showActiveConversations() {
    this.conversationService.getAllConversataionsForClinic(false, this.authRepo.loginUserId).subscribe({
      next: res => {
        this.conversations = res.data.videoCalls;
        this.showPast = false;
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
}










