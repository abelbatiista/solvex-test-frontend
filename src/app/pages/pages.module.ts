// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Socket Module
import { SocketIoModule } from 'ngx-socket-io';

// Routing Modules
import { PagesRoutingModule } from './pages-routing.module';

// User Modules
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

// Pipes Modules
import { PipesModule } from '../pipes/pipes.module';
import { FilterModule } from '../filter';

// User Components
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { UserComponent } from './user/user.component';
import { MessageComponent } from './message/message.component';
import { ChatterComponent } from './message/chatter/chatter.component';
import { ChatComponent } from './message/chat/chat.component';
import { MethodComponent } from './method/method.component';
import { LocationComponent } from './location/location.component';
import { AddComponent as AddMethodComponent } from './method/add/add.component';
import { AddComponent as AddLocationComponent } from './location/add/add.component';
import { AddComponent as AddOrderComponent } from './order/add/add.component';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ProfileComponent,
    OrderComponent,
    ProductComponent,
    InvoiceComponent,
    UserComponent,
    MessageComponent,
    ChatterComponent,
    ChatComponent,
    MethodComponent,
    LocationComponent,
    AddMethodComponent,
    AddLocationComponent,
    AddOrderComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    PipesModule,
    FilterModule
  ],
  exports: []
})
export class PagesModule { }
