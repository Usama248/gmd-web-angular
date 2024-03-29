import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MenuItem, Message } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SidebarService } from '../../services/sidebar.service';
import { AuthRepository } from 'src/app/services/auth-service/auth.repository';
import { UserProfileModel } from 'src/app/models/user/user-profile.model';
import { RouterModule } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { BadgeModule } from 'primeng/badge';
import { NotificationRepository } from 'src/app/services/notificaition-service/notification-repository';
import { LatestNotificationComponent } from "../latest-notification/latest-notification.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [CommonModule, MenubarModule, MenuModule, ButtonModule, RouterModule, MessagesModule, BadgeModule, LatestNotificationComponent]
})
export class HeaderComponent implements OnInit {
  showsideNav: boolean = true;
  loginUserData: UserProfileModel | undefined;
  constructor(private sidebarService: SidebarService, private authRepository: AuthRepository, private notificationRepo: NotificationRepository) { }
  notificationDropdown: boolean = false;
  Profileicon: boolean = false;
  totalNotifications = "0";
  alertNoteMessages: Message[] = [];
  ngOnInit(): void {
    console.log("header initialized");
    this.getNotificationCount();
    this.alertNoteMessages = [
      { severity: 'warn', detail: 'ATTENTION: You have not registered any clinical users (Standard or Advanced users) under this account.' },
    ];
    this.authRepository.getLoginUserData().subscribe(res => {
      this.loginUserData = res;
    })
  }
  getNotificationCount() {
    this.notificationRepo.getUserNotificationsCount().subscribe({
      next: res => {
        if (res > 100) {
          this.totalNotifications = "100+";
        } else {
          this.totalNotifications = res.toString();
        }
      }, error: err => {
        console.log(err);
      }
    })
  }
  showNotificationDropdown(e: Event) {
    e.stopPropagation();
    this.notificationDropdown = !this.notificationDropdown
  }
  logout(): void {
    this.authRepository.logout();
  }
  stopPropogate(e: Event) {
    e.stopPropagation();
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    this.notificationDropdown = false
    this.Profileicon = false;
  }
  showLogoutToggle(e:Event){
    e.stopPropagation();
    this.Profileicon = !this.Profileicon
  }
  toggleSidenav():void {
    this.showsideNav = !this.showsideNav
    this.sidebarService.showNav(this.showsideNav)
  }
  // getLatesttNotifications() {
  //   this.notificationRepo.getLatestNotifications().subscribe({
  //     next: res => {

  //     },
  //     error: err => {
  //     }
  //   })
  // }
}
