// Angular Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// User Modules
import { AuthRoutingModule } from './auth/auth-routing.module';
import { ExceptionsModule } from './exceptions/exceptions.module';
import { PagesRoutingModule } from './pages/pages-routing.module';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'pages/home'},
  {path: '**', pathMatch: 'full', redirectTo: 'notfound'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    ExceptionsModule,
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
