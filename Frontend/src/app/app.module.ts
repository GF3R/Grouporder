import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from 'src/components/orders/orders.component';
import { OrderComponent } from 'src/components/order/order.component';
import { AddOrderItemComponent } from 'src/components/add-order-item/add-order-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderListComponent } from 'src/components/order-list/order-list.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { OrderItemComponent } from '../components/order-item/order-item.component';



@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderListComponent,
    OrderComponent,
    AddOrderItemComponent,
    OrderItemComponent,
  ],
  imports: [
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatCheckboxModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
