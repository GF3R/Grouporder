import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';
import { GroupOrder } from 'src/model/GroupOrder';
import { Order } from 'src/model/Order';
import { GrouporderService } from 'src/services/grouporder.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  @Input() order: Order | undefined;

  displayedColumns = ['customerName', 'items', 'total', 'actions'];
  groupOrders$ = this.groupOrderService.groupOrders$;
  currentOrders$ = this.groupOrderService.customerOrders$;
  currentGroupOrderName!: string;
  currentGroupOrderId!: string;

  editModeMap: Map<string, boolean> = new Map();

  totalSum$ = this.currentOrders$.pipe(
    map(
      (order) =>
        order?.reduce(
          (sum, order) => Number(sum) + Number(order.total),
          0
        ) ?? 0
    )
  );

  constructor(
    private route: ActivatedRoute,
    private groupOrderService: GrouporderService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentGroupOrderId = params['id'];
      this.currentGroupOrderName = params['name'];
    });
    // this.groupOrderService.getActiveGroupOrders().subscribe();
    this.groupOrderService.getCustomerOrdersFromGroupOrder(this.currentGroupOrderId).subscribe();
    // this.groupOrders$.pipe(
    //   map((orders: GroupOrder[]) => {
    //     const order = orders.find(u => u.id = this.currentGroupOrderId);
    //     return order ? this.currentGroupOrderName = `${order.name}` : 'User not found';
    //   })
    // ).subscribe();
  }

  // get gettotal(): number {
  //   return this.order!.total;
  // }

  // set settotal(value: number) {
  //   this.order!.total = value;
  // }

  saveChanges(order: Order, id: string) {
    this.groupOrderService.updateCustomerOrder(order, id).subscribe(() => {
      this.groupOrderService.getCustomerOrdersFromGroupOrder(this.currentGroupOrderId).subscribe();
    });
    this.editModeMap.set(id, false);
  }

  toggleEditMode(id: string) {
    this.editModeMap.set(id, !this.editModeMap.get(id));
  }

  isEditMode(id: string): boolean {
    return this.editModeMap.get(id) || false;
  }

  cancelEdit(id: string) {
    this.groupOrderService.getCustomerOrdersFromGroupOrder(this.currentGroupOrderId).subscribe();
    this.editModeMap.set(id, false);
  }

  deleteOrder(id: string) {
    this.groupOrderService.deleteCustomerOrder(id).subscribe();
  }

}
