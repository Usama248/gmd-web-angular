import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './route-guards/auth.guard';
export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'login',
    title: 'Log in to Gaudian MD',
    loadComponent: () => import('./pages/auth/auth-layout/auth-layout.component').then(x => x.AuthLayoutComponent),
    children: [
      { path: '', title: 'Log in to Gaudian MD', loadComponent: () => import('./pages/auth/login/login.component').then(x => x.LoginComponent) },
      { path: 'forgot-password', title: 'Reset your password', loadComponent: () => import('./pages/auth/forgot-password/forgot-password.component').then(x => x.ForgotPasswordComponent) },
    ],
  },
  {
    path: 'clinic',
    canActivate: [authGuard],
    loadComponent: () => import('./shared/components/layout/layout.component').then(x => x.LayoutComponent),
    children: [
      { path: 'dashboard', title: 'Clinic Dashboard', canActivate: [authGuard], loadComponent: () => import('./pages/clinic/clinic-dashboard/clinic-dashboard.component').then(x => x.ClinicDashboardComponent) },
      { path: 'profile-main',  title: 'profile-main', loadComponent: () => import('./pages/profile/profile-main/profile-main.component').then(x => x.ProfileMainComponent) },
      { path: 'physicians', title: 'Physicians', loadComponent: () => import('./pages/physician/physician.component').then(x => x.PhysicianComponent) },
      { path: 'conversation',  title: 'Conversation', loadComponent: () => import('./pages/conversation/conversation.component').then(x => x.ConversationComponent) },
      { path: 'document', title: 'Documents', loadComponent: () => import('./pages/document/document.component').then(x => x.DocumentComponent) },
      { path: 'chart-review',  title: 'Chart Review', loadComponent: () => import('./pages/chart-review/chart-review.component').then(x => x.ChartReviewComponent) },
      { path: 'users', title: 'Users', loadComponent: () => import('./pages/user-manager/user-manager.component').then(x => x.UserManagerComponent) },
      { path: 'billing', title: 'Billing Details', loadComponent: () => import('./pages/billing-dashboard/billing-dashboard.component').then(x => x.BillingDashboardComponent) },
      { path: 'subscription', title: 'Subscription',loadComponent: () => import('./pages/subscription/subscription.component').then(x => x.SubscriptionComponent) },
      { path: 'payment',title: 'Payment Due', loadComponent: () => import('./pages/payment-due/payment-due.component').then(x => x.PaymentDueComponent) },
      { path: 'notification', title: 'Notification', loadComponent: () => import('./pages/notification/notification.component').then(x => x.NotificationComponent) },
    ],
  },
  // {
  //   path: 'page-not-found',
  //   loadComponent: () =>
  //     import('./pages/not-found-page/not-found-page.component'),
  // },
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
