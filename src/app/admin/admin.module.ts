import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from '../user/navbar/navbar.component';

@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [CommonModule, AdminRoutingModule, NavbarComponent],
  exports: [HomeComponent],
})
export class AdminModule {}
