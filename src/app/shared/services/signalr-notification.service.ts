import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';
import { RootReducerState } from 'src/store/reducers';
import { Store } from '@ngrx/store';
import { NotificationActions } from 'src/store/actions/notification-action';

@Injectable()
export class SignalrNotificationService {
  hubConnection!: signalR.HubConnection;
  constructor(public _authService: AuthService, private toastrService: ToastService, private store: Store<RootReducerState>) {
    console.log("SignalR service initialized");
    this.startConnection();
  }

  public startConnection = () => {
    let hubUrl = environment.apiUrl + '/notificationHub';

    if (this.hubConnection?.state != "Connected") {
      if (!WebSocket.OPEN) {
        Object.defineProperty(WebSocket, 'OPEN', { value: 1 });
      }
      this.hubConnection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Debug)
        .withUrl(hubUrl, {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        }).withAutomaticReconnect().build();

      this.hubConnection
        .start()
        .then(() => {
          console.log('Connection started!');
        })
        .catch(err => {
          console.log(err);
        });
    }

    this.hubConnection.on("ReceiveNotification", (notification, hasError) => {
      if (notification && this._authService.loginUserId === notification.userId) {
        this.handleReceiveNotification(notification);
      }
    });
  }

  handleReceiveNotification(notification: any) {
    this.store.dispatch(NotificationActions.loadReceiveNewNotification());
    const { userId, subject, message } = notification;
    if (notification.isDeclined) {
      this.toastrService.showError(message);
    } else {
      this.toastrService.showInfo(message);
    }
    // gmd_base.reloadViewComponents();
  }
  closeConnection() {
    this.hubConnection?.stop().then(() => {
      console.log('Connection stop!');
    })
      .catch(err => {
        console.log(err);
      });
  }
}
