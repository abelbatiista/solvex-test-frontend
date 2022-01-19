// Angular Modules
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AdminGuard } from "../guards/admin.guard";

// User Components
import { HomeComponent } from './home/home.component';
import { OrderComponent } from "./order/order.component";
import { ProfileComponent } from './profile/profile.component';
import { ProductComponent } from './product/product.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { UserComponent } from './user/user.component';
import { MessageComponent } from './message/message.component';
import { MethodComponent } from "./method/method.component";
import { LocationComponent } from "./location/location.component";
import { AddComponent as AddMethodComponent } from "./method/add/add.component";
import { AddComponent as AddLocationComponent } from "./location/add/add.component";
import { AddComponent as AddOrderComponent } from "./order/add/add.component";

const routes: Routes = [
    {path: 'message', component: MessageComponent},
    {path: 'home', component: HomeComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'user', component: UserComponent, canActivate: [AdminGuard]},
    {path: 'product', component: ProductComponent, canActivate: [AdminGuard]},
    {path: 'method', component: MethodComponent},
    {path: 'method/add', component: AddMethodComponent},
    {path: 'location', component: LocationComponent},
    {path: 'location/add', component: AddLocationComponent},
    {path: 'order', component: OrderComponent},
    {path: 'order/add', component: AddOrderComponent},
    {path: 'invoice', component: InvoiceComponent},
    {path: '', pathMatch: 'full', redirectTo: 'home'}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesChildRoutingModule { }