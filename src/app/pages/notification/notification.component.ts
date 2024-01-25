import { Component } from '@angular/core';

import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MenuModule, ButtonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
items: MenuItem[] = [
  {
    label: 'Mark as Read',
    icon: 'pi pi-eye',
    command: () => {
      this.markAsRead();
  }

},
{
  label: 'Delete',
  icon: 'pi pi-trash',
  command: () => {
    this.deleteNotification();
}

},
{
label: 'Redirect',
icon: 'pi pi-external-link',

}
];

markAsRead(){

}
deleteNotification(){

}
}
