import { Order } from './Order';

export class GroupOrder {
  id: number;
  name: string;
  orders: Order[];
  total: number;

  constructor(id: number, name: string, orders: Order[] = []) {
    this.id = id;
    this.name = name;
    this.orders = orders;
    this.total = orders.reduce((acc, order) => acc + order.total, 0);
  }
}
