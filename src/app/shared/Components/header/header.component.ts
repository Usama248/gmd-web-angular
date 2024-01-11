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
  isClinic: boolean = false;
  items: MenuItem[] | undefined;
  noti: MenuItem[] | undefined;
  Profileicon: boolean = false;
  totalNotifications = "0";
  activeIcon: boolean = false

  messages: Message[] = [];
  ngOnInit(): void {
    console.log("header initialized");
    this.notificationRepo.getUserNotificationsCount().subscribe({
      next: res => {
        if (res > 100) {
          this.totalNotifications = "100+";
        } else {
          this.totalNotifications = res.toString();
        }
      }, error: err => {
      }
    })
    this.messages = [
      { severity: 'warn', detail: 'ATTENTION: You have not registered any clinical users (Standard or Advanced users) under this account.' },
    ];
    this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink: '/clinic/profile-main',
        name: 'Profile'

      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.authRepository.logout()
      },

    ];
    this.authRepository.getLoginUserData().subscribe(res => {
      this.isClinic = res?.isClinic;
      this.loginUserData = res;
    })
  }
  showNotificationDropdown(e: Event) {
    e.stopPropagation();
    this.notificationDropdown = !this.notificationDropdown
  }
  stopPropogate(e: Event) {
    e.stopPropagation();
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    this.notificationDropdown = false
  }
  toggleSidenav() {
    this.showsideNav = !this.showsideNav
    this.sidebarService.showNav(this.showsideNav)
  }
  getLatesttNotifications() {
    this.notificationRepo.getLatestNotifications().subscribe({
      next: res => {

      },
      error: err => {
      }
    })
  }
}
