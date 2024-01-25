import { Component, OnInit } from '@angular/core';

import { NotificationRepository } from 'src/app/services/notificaition-service/notification-repository';
import { NotificationModel } from 'src/app/models/notification/notification-model';
import { NotificationTypeIcons } from '../../constants/enums/notification-type-enum';
import { TimeAgoPipe } from "../../pipes/time-ago.pipe";

@Component({
    selector: 'app-latest-notification',
    standalone: true,
    templateUrl: './latest-notification.component.html',
    styleUrls: ['./latest-notification.component.scss'],
    imports: [TimeAgoPipe],
    
})
export class LatestNotificationComponent implements OnInit {
  notifications: NotificationModel[] = [];
  NOTIFICATION_TYPE_NAME$ = NotificationTypeIcons;
  constructor(private notificationRepository: NotificationRepository) {
  }
  ngOnInit(): void {
    this.getLastestNotifications();
  }
  getLastestNotifications() {
    this.notificationRepository.getLatestNotifications().subscribe({
      next: res => {
        res.data.forEach((notification: any) =>
        (
          notification.createdDate = new Date(notification.createdDate)
        ));
        this.notifications = res.data;
      }, error: err => {
      }
    })
  }
}
