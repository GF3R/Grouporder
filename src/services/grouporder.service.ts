import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
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

  groupOrdersSubject = new BehaviorSubject<GroupOrder[]>(this.mockData);
  groupOrders$ = this.groupOrdersSubject.asObservable();

  constructor() {}

  getActiveOrders(): Observable<GroupOrder[]> {
    // mock data
    return this.groupOrders$;
  }

  getGroupOrder(id: number): Observable<GroupOrder | undefined> {
    // mock data
    return this.groupOrders$.pipe(
      map((orders) => orders.find((order) => order.id === id))
    );
  }

  getOrder(groupId: number, orderId: number): Observable<Order | undefined> {
    return this.groupOrders$.pipe(
      map((orders) =>
        orders
          .find((order) => order.id === groupId)
          ?.orders.find((order) => order.id === orderId)
      )
    );
  }

  addOrderItem(groupId: number, order: Order) {
    const currentGroupOrder = this.groupOrdersSubject.value;
    currentGroupOrder.find((order) => order.id === groupId)?.orders.push(order);
    this.groupOrdersSubject.next([...currentGroupOrder]);
  }
}
