import { NotificationTypeEnum } from "src/app/shared/constants/enums/notification-type-enum";

export interface NotificationModel {
    id: number;
    notificationDescription: string;
    notificationType: NotificationTypeEnum;
    isRead: boolean;
    isHidden: boolean;
    notificationUrl: string;
    userId: string;
    notificationId: number;
    videoNotificationUrl: string;
    createdDate: Date;
    clinicDocId: number;
    roomId?: number | null;
    imageUrl: string;
    userName: string;
    conversationType: number;
    creatorName: string;
    creatorImage: string;
}