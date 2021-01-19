import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component'
import { OrderComponent } from './components/order/order.component';
import { ReciptComponent } from './components/recipt/recipt.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreComponent } from './components/store/store.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'recipt', component: ReciptComponent, },
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent },
  { path: '', pathMatch: "full", redirectTo: 'login' },
  { path: 'order', component: OrderComponent, canActivate:[AuthGuardService] },
  { path: 'store', component: StoreComponent, canActivate:[AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
