import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from 'src/components/order/order.component';
import { OrdersComponent } from 'src/components/orders/orders.component';

const routes: Routes = [
  { path: 'orders', component: OrdersComponent },
  { path: 'order/:id/:name', component: OrderComponent },
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
