import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AgoraRtmService } from 'src/app/services/chat/agora-rtm.service';
import { ConversationService } from 'src/app/services/conversation/conversation.service';
import { RoomCredentialsModel } from 'src/app/models/conversation/room-credentials-model';
import { ConversationModel } from 'src/app/models/conversation/conversation-model';
import { ButtonModule } from 'primeng/button';
import { ConvoParticipantMessageDTO, MessageModel } from 'src/app/models/conversation/message-model';
import { UserProfileModel } from 'src/app/models/user/user-profile.model';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-conversation-chat',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  providers: [DatePipe],
  templateUrl: './conversation-chat.component.html',
  styleUrls: ['./conversation-chat.component.scss']
})
export class ConversationChatComponent implements OnInit, OnDestroy {
  @Input() conversation!: ConversationModel;
  @Input() loginUserInfo!: UserProfileModel;
  @Input() allowMessage: boolean = false;
  numericUserId = Math.floor(Math.random() * 1000)
  messages: ConvoParticipantMessageDTO[] = [];
  roomCredential!: RoomCredentialsModel;
  constructor(private agoraRtmService: AgoraRtmService, private coversationService: ConversationService, private datePipe: DatePipe,
    private toastService: ToastService) { }
  ngOnInit(): void {
    this.loadPreviousChat()
    if(this.allowMessage) {
    this.connectToAgoraRTM();
    }
  }
  loadPreviousChat(): void {
    this.coversationService.getOldMessages(this.conversation.id, this.loginUserInfo.id).subscribe({
      next: res => {
      if(res.status === 1) {
        this.messages = res.data
      }
      }, error: err => {
      }
    });
  }
  connectToAgoraRTM(): void {
    this.coversationService.getRoomCredentials(this.conversation.id, this.numericUserId).subscribe((res) => {
      if (res.status == 1) {
        this.roomCredential = res.data as RoomCredentialsModel;
        this.agoraRtmService.connect(this.roomCredential.appKey, this.roomCredential.roomName, this.numericUserId,
          this.roomCredential.rtmToken, this.onReceiveMessageCallback)
      } else {
        this.toastService.showError(res.message);
      }
    });
  }
  sendChatMessage(msgInput: HTMLTextAreaElement): void {
    const message: ConvoParticipantMessageDTO = {
      id: 0,
      participantID: 0,
      userID: this.numericUserId,
      participantName: `${this.loginUserInfo.firstName} ${this.loginUserInfo.lastName}`,
      participantImage: this.loginUserInfo.imageString,
      conversationID: 0,
      text: this.formattedText(msgInput.value),
      messageDisplayTime: this.datePipe.transform(new Date(), 'MMM dd yyyy HH:mm a') || '',
      isReadByPhysician: false,
      messageTime: new Date(),
    }
    this.messages.push(message);
    const agoraMessage: MessageModel = {
      id: new Date(),
      name: message.participantName,
      image: message.participantImage,
      time: message.messageDisplayTime,
      uid: message.userID,
      msgText: message.text
    }
    this.agoraRtmService.sendMessage(this.roomCredential.roomName, JSON.stringify(agoraMessage));
    msgInput.value = "";
  }
  onReceiveMessageCallback = (resMsg: any): void => {
    var receiveMessage = JSON.parse(resMsg.message) as MessageModel;
    const message: ConvoParticipantMessageDTO = {
      id: 0,
      participantID: 0,
      userID: receiveMessage.uid,
      participantName: receiveMessage.name,
      participantImage: receiveMessage.image,
      conversationID: 0,
      text: receiveMessage.msgText,
      messageDisplayTime: receiveMessage.time,
      isReadByPhysician: false,
      messageTime: new Date(),
    }
    this.messages.push(message);
  }
  ngOnDestroy(): void {
    this.agoraRtmService.logout();
  }
   formattedText(originalText: string): string {
    return originalText.replace(/\n/g, '<br>');
  }
}
