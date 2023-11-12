import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { GroupOrder } from 'src/model/GroupOrder';
import { GrouporderService } from 'src/services/grouporder.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  currentOrder$ = this.grouporderService.groupOrders$.pipe(
    map((orders) => {
      return orders.find(
        (order) => order.id === this.currentOrderIdSubject.value
      );
    })
  );

  currentOrderIdSubject = new BehaviorSubject<number | undefined>(undefined);
  currentOrderId$ = this.currentOrderIdSubject
    .asObservable()
    .pipe(map((id) => id ?? 0));
  totalSum$ = this.currentOrder$.pipe(
    map(
      (order) =>
        order?.orders.reduce(
          (sum, order) => Number(sum) + Number(order.total),
          0
        ) ?? 0
    )
  );

  constructor(
    private route: ActivatedRoute,
    private grouporderService: GrouporderService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.currentOrderIdSubject.next(Number(params.get('id')));
    });
  }
}
