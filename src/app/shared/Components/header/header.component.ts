import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenubarModule, MenuModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
showsideNav:boolean  = true;
  constructor(private sidebarService:SidebarService, private authService: AuthService){}
  notificationDropdown: boolean = false;
  items: MenuItem[] | undefined;
  noti: MenuItem[] | undefined;
  ngOnInit(): void {
    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-refresh',
        command: () => this.authService.logout()
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
  }
  showNotificationDropdown(e:Event) {
    e.stopPropagation();
    this.notificationDropdown = !this.notificationDropdown
  }
  stopPropogate(e:Event){
    e.stopPropagation();
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    this.notificationDropdown = false
  }
  toggleSidenav(){
    this.showsideNav = !this.showsideNav
    this.sidebarService.showNav(this.showsideNav)
  }
}
