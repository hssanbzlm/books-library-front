import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [CommonModule, AdminRoutingModule],
  exports: [HomeComponent],
})
export class AdminModule {}
