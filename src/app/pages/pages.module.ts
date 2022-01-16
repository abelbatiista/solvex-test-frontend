// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Routing Modules
import { PagesRoutingModule } from './pages-routing.module';

// User Modules
import { SharedModule } from '../shared/shared.module';

// Pipes Modules
import { PipesModule } from '../pipes/pipes.module';

// User Components
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ProfileComponent,
    OrderComponent,
    ProductComponent,
    InvoiceComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PipesModule
  ],
  exports: []
})
export class PagesModule { }
