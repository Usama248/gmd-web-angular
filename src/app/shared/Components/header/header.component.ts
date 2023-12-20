import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { AuthRepository } from 'src/app/services/auth-service/auth.repository';
import { UserProfileModel } from 'src/app/models/user/user-profile.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenubarModule, MenuModule, ButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
showsideNav:boolean  = true;
loginUserData : UserProfileModel | undefined;
  constructor(private sidebarService:SidebarService, private authRepository: AuthRepository){}
  notificationDropdown: boolean = false;
  isClinic: boolean = false;
  items: MenuItem[] | undefined;
  noti: MenuItem[] | undefined;
  ngOnInit(): void {
    this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink: '/profile-main',
        name: 'Profile'

      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
          command: () => this.authRepository.logout()
      },
      {
        label: 'Update',
        icon: 'pi pi-refresh',

      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      }

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
}
