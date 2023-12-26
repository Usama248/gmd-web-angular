import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
declare function FreshworksWidget(arg0: string): any;
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements AfterViewInit {
  showNav: boolean = true
  window = window;
  constructor(private sideNavService: SidebarService, private router: Router) {
    this.sideNavService.onShowNav().subscribe(x => this.showNav = x)

  }
  ngAfterViewInit(): void {

  }

  showResource: boolean = false
  navitem: any[] = [
    {
      icon: `pi pi-home`,
      route: "/clinic-dashboard",
      name: "Dashboard",
      subnav: [

      ]
    },
    {
      icon: "pi pi-user-plus",
      route: "/physicians",
      name: "Physicians",
      subnav: [

      ]
    },
    {
      icon: "pi pi-comments",
      route: "/conversation",
      name: "Conversations",
      subnav: [

      ]
    },
    {
      icon: "pi pi-file",
      route: null,
      name: "Documents",
      subnav: [
        {
          icon: "pi pi-file-import",
          route: "/chart-review",
          name: "Chart Review",

        },
        {
          icon: "pi pi-chart-bar",
          route: "/document",
          name: "Document",
        },
      ]
    },

    {
      icon: "pi pi-users",
      route: "/users",
      name: "Manage Users",
      subnav: [

      ]
    },
    {
      icon: "pi pi-file",
      route: null,
      name: "Billing Details",
      subnav: [
        {
          icon: "pi pi-chart-pie",
          route: "/billing",
          name: "Billing Dashboard",

        },
        {
          icon: "pi pi-id-card",
          route: "/subscription",
          name: "Subscriptions",

        },
        {
          icon: "pi-credit-card pi",
          route: "/payment",
          name: "Payment Due",

        },
      ]
    },

    {
      icon: "pi pi-bell ",
      route: "/notification",
      name: "Notifications",
      subnav: [

      ]
    },

  ]
  showsub: any = -1;
  showSubmenu(e: any) {
    this.showsub == e ? this.showsub = -1 : this.showsub = e
  }
  hasMatchingRoute(subnav: []) {
   var routes = subnav.map((x :any) => x.route);
   return routes.some(x=> x == this.router.url) ;
  }
 
  
  togglePopup() {
    this.showResource = !this.showResource
  }
  FreshworksWidgetOpen() {
    FreshworksWidget('open');
  }
}
