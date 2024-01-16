import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { GroupOrder } from 'src/model/GroupOrder';
import { GrouporderService } from 'src/services/grouporder.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})

export class OrdersComponent implements OnInit {
  displayedColumns = ['Index', 'Customer', 'Order Total'];
  groupOrders$ = this.groupOrderService.groupOrders$;

  selectedItems: Set<string> = new Set<string>();

  editedOrders: GroupOrder[] = [];
  isEditMode: boolean = false;

  groupOrderForm: FormGroup<{
    name: FormControl;
    orders: FormControl;
    total: FormControl;
  }>;
  constructor(private groupOrderService: GrouporderService, private fb: FormBuilder) {
    this.groupOrderForm = new GroupOrder('', '', [], 0).createFormGroup(this.fb);
  }

  ngOnInit() {
    this.selectedItems.clear();
    this.groupOrderService.getActiveGroupOrders().subscribe();
  }

  addGroupOrder() {
    try {
      const placeHolder = '99';
      this.groupOrderService.addGroupOrderWithValidation(GroupOrder.createFromForm(
        placeHolder,
        this.groupOrderForm,
        []
      )).subscribe();
      this.groupOrderForm.reset();
    } catch (error) {
      console.error('Error adding group order:', error);
    }
  }

  deleteGroupOrder() {
    try {
      if (this.selectedItems.size > 0) {
        const selectedItemsId = Array.from(this.selectedItems);
        this.groupOrderService.deleteGroupOrders(selectedItemsId).subscribe();
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
    console.log(this.selectedItems);
  }

  isSelected(orderId: string): boolean {
    return this.selectedItems.has(orderId);
  }

  onChange(order: GroupOrder) {
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
    this.groupOrderService.updateGroupOrder(this.editedOrders).subscribe(() => {
      this.groupOrderService.getActiveGroupOrders().subscribe();
    });
    this.editedOrders = [];
  }

}

