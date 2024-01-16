import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Order } from 'src/model/Order';
import { GrouporderService } from 'src/services/grouporder.service';
import { OrderListComponent } from '../order-list/order-list.component';

@Component({
  selector: 'app-add-order-item',
  templateUrl: './add-order-item.component.html',
  styleUrls: ['./add-order-item.component.css'],
})
export class AddOrderItemComponent implements OnInit {
  @ViewChild(OrderListComponent) orderListComponent!: OrderListComponent;
  @Input() groupOrderId!: string | null;

  @Input() order: Order | undefined;

  @Input() parentItems: string[] = [];
  @Output() itemsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  empty: boolean = false;

  form: FormGroup<{
    customerName: FormControl;
    items: FormControl;
    total: FormControl;
  }>;
  constructor(
    private formBuilder: FormBuilder,
    private orderService: GrouporderService
  ) {
    const numb = 0;
    if (this.order === undefined) {
      this.order = new Order(numb.toString(), '', [], 0);
    }
    this.form = this.order.createFormGroup(this.formBuilder);
  }

  ngOnInit() { }

  addToOrder() {
    if (!this.form || !this.parentItems) {
      this.empty = true;
      return;
    }
    const placeHolder = '99';
    this.form.patchValue({ items: this.parentItems });
    this.orderService.addCustomerOrderWithValidation(
      this.groupOrderId!,
      Order.createFromForm(placeHolder, this.form, this.parentItems)
    ).subscribe();
    this.form.reset();
    this.orderListComponent.clearItems();
  }

  onItemsChange(updatedItems: string[]) {
    this.parentItems = updatedItems;
  }

}
