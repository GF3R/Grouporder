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

  displayedColumns = ['Name', 'Foodlist', 'Total'];
  currentGroupOrderId!: string;
  grandparentItems: string[] = [];
  groupOrders$ = this.groupOrderService.groupOrders$;
  currentOrders$ = this.groupOrderService.customerOrders$;
  currentGroupOrderName: string = " ";
  editedOrders: Order[] = [];
  isEditMode: boolean = false;

  selectedItems: Set<string> = new Set<string>();

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
    });
    console.log(this.currentGroupOrderId);
    this.groupOrderService.getActiveGroupOrders().subscribe();
    this.groupOrderService.getCustomerOrdersFromGroupOrder(this.currentGroupOrderId).subscribe();
  }

  onItemsChange(updatedItems: string[]) {
    this.grandparentItems = updatedItems;
  }

  onChange(order: Order) {
    const existingIndex = this.editedOrders.findIndex(o => o.id === order.id);

    if (existingIndex !== -1) {
      this.editedOrders[existingIndex] = order;
    } else {
      this.editedOrders.push(order);
    }
  }

  edit() {
    this.isEditMode = true;
    this.editedOrders = [];
  }

  cancel() {
    this.isEditMode = false;
    this.editedOrders = [];
  }

  save() {
    this.isEditMode = false;
    this.groupOrderService.updateCustomerOrders(this.editedOrders, this.currentGroupOrderId).subscribe(() => {
      this.groupOrderService.getCustomerOrdersFromGroupOrder(this.currentGroupOrderId).subscribe();
    });
    console.log(this.editedOrders);
    this.editedOrders = [];
  }

  deleteOrder() {
    try {
      if (this.selectedItems.size > 0) {
        const selectedItemsId = Array.from(this.selectedItems);
        this.groupOrderService.deleteCustomerOrder(selectedItemsId).subscribe();
        this.selectedItems.clear();
      }
    } catch (error) {
      console.error('Error deleting group orders:', error);
    }
  }

  onRowClick(orderId: string): void {
    if (this.selectedItems.has(orderId)) {
      this.selectedItems.delete(orderId);
    } else {
      this.selectedItems.add(orderId);
    }
  }

  isSelected(orderId: string): boolean {
    return this.selectedItems.has(orderId);
  }

}
