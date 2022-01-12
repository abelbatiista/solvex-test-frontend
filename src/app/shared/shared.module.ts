import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    SharedComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
