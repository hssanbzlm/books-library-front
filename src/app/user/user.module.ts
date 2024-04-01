import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

import { BookListComponent } from './book-list/book-list.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
@NgModule({
  declarations: [HomeComponent, BookListComponent, NavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [HomeComponent],
})
export class UserModule {}
