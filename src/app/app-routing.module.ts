import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/auth.guard';
export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'login',
    title: 'Log in to Gaudian MD',
    loadComponent: () => import('./pages/auth/auth-layout/auth-layout.component').then(x=>x.AuthLayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./pages/auth/login/login.component').then(x=>x.LoginComponent) },
      { path: 'forgot-password',  title: 'Reset your password', loadComponent: () => import('./pages/auth/forgot-password/forgot-password.component').then(x=>x.ForgotPasswordComponent) },
    ],
  },
  {
    path: 'clinic-dashboard',
    title: 'Clinic Dashboard',
    loadComponent: () => import('./shared/Components/layout/layout.component').then(x=>x.LayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/clinic/clinic-dashboard/clinic-dashboard.component').then(x=>x.ClinicDashboardComponent) },
    ],
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
