import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { AuthService } from 'src/app/appServices/auth.service';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';

@Injectable()
export class SignalrNotificationService {

  constructor(public _authService: AuthService, private toastrService: ToastService) { 
    console.log("SignalR service initialized")
  }

  public startConnection = () => {
    let hubUrl = environment.apiUrl + '/notificationHub';
    
    if (!WebSocket.OPEN) {
      Object.defineProperty(WebSocket, 'OPEN', { value: 1 });
    }
    const hubConnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl(hubUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      }).withAutomaticReconnect().build();

    hubConnection
      .start()
      .then(() => {
        console.log('Connection started!');

      })
      .catch(err => {
        console.log(err);
      });

    hubConnection.on("ReceiveNotification", (notification, hasError) => {
      if (notification && this._authService.loginUserId === notification.userId) {
        this.handleReceiveNotification(notification);
      }
    });
  }

  handleReceiveNotification(notification: any) {
    const { userId, subject, message } = notification;
    if (notification.isDeclined) {
      this.toastrService.showError(message);
    } else {
      this.toastrService.showInfo(message);
    }
    // gmd_base.reloadViewComponents();
  }
}
