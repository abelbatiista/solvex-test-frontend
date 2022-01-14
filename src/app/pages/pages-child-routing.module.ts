// Angular Modules
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

// User Components
import { HomeComponent } from './home/home.component';
import { OrderComponent } from "./order/order.component";
import { ProfileComponent } from './profile/profile.component';
import { ProductComponent } from './product/product.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'order', component: OrderComponent},
    {path: 'product', component: ProductComponent},
    {path: 'invoice', component: InvoiceComponent},
    {path: '', pathMatch: 'full', redirectTo: 'home'}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesChildRoutingModule { }