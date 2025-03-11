import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule,} from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {path: 'login',component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', redirectTo: 'login'}
];
