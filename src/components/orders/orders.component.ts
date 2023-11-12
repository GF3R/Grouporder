import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GroupOrder } from 'src/model/GroupOrder';
import { GrouporderService } from 'src/services/grouporder.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders$ = this.groupOrderService.groupOrders$;
  constructor(private groupOrderService: GrouporderService) {}

  ngOnInit() {}
}
