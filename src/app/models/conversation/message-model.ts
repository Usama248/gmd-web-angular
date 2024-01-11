export interface MessageModel {
    id: Date
    name: string,
    image: string,
    time: string,
    uid: number,
    msgText: string
}

export interface  ConvoParticipantMessageDTO {
    id: number;
    participantID: number;
    userID: number;
    participantName: string;
    participantImage: string;
    conversationID: number;
    text: string;
    messageDisplayTime: string;
    isReadByPhysician: boolean;
    messageTime: Date;
  }