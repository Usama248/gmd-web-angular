import { Injectable } from '@angular/core';
import AgoraRTM, { RTMClient, RTMConfig } from 'agora-rtm-sdk';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable({
  providedIn: 'root'
}) 
export class AgoraRtmService {
  constructor(private toastService: ToastService) {
  }
  client: RTMClient | undefined;
  connect(appKey: string, channelName: string, userId: number, rtmToken: string, onReceiveMessageCallback: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const rTMConfig: RTMConfig = {
        token: rtmToken
      };
      const client = new AgoraRTM.RTM(appKey, userId.toString(), rTMConfig);  
      this.client = client;
      client.login().then(res => {
        console.log("login to agora rtm");
        client.createStreamChannel(channelName);
        client.subscribe(channelName).then((res: any) => {
        client.addEventListener('message', onReceiveMessageCallback);
        resolve(true);
        }).catch(err => {
          console.log(err);
          this.toastService.showError("Something went wrong, please try again later");
          reject(true);
        })
      });
    });
  }
  sendMessage(channelName: string, message: string): void {
    this.client?.publish(channelName, message);
  }
  logout(): void {
    this.client?.logout();
  }
}