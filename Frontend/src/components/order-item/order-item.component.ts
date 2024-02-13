import { Component, Input } from '@angular/core';
import { Order } from 'src/model/Order';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent {
  @Input() toggleEditMode: boolean = false;
  @Input() order: Order | undefined;

}
