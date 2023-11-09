import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GroupOrder } from 'src/model/GroupOrder';
import { Order } from 'src/model/Order';

@Injectable({
  providedIn: 'root',
})
export class GrouporderService {
  mockData: GroupOrder[] = [
    new GroupOrder(1, 'Group 1'),
    new GroupOrder(2, 'Group 2'),
    new GroupOrder(3, 'Group 3'),
    new GroupOrder(4, 'Group 4'),
    new GroupOrder(5, 'Group 5', [
      new Order(1, 'Order 1', ['A, B', 'C'], 2),
      new Order(2, 'Order 2', ['A, B', 'C'], 2),
    ]),
  ];

  constructor() {}

  getActiveOrders(): Observable<GroupOrder[]> {
    // mock data
    return of(this.mockData);
  }

  getGroupOrder(id: number): Observable<GroupOrder | undefined> {
    // mock data
    return of(this.mockData.find((order) => order.id === id));
  }

  getOrder(groupId: number, orderId: number): Observable<Order | undefined> {
    // mock data
    return of(
      this.mockData
        .find((order) => order.id === groupId)
        ?.orders.find((order) => order.id === orderId)
    );
  }
}
