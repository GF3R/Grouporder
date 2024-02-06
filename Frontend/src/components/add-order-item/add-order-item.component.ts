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

  @Output() empty: boolean | undefined;

  form: FormGroup<{
    customerName: FormControl;
    items: FormControl;
    total: FormControl;
  }>;
  constructor(
    private formBuilder: FormBuilder,
    private orderService: GrouporderService
  ) {
    this.form = new Order('', [], 0).createFormGroup(this.formBuilder);
  }

  ngOnInit() { }

  addToOrder() {
    if (this.parentItems.length > 0) {
      this.form.patchValue({ items: this.parentItems });
      this.orderService.addCustomerOrderWithValidation(
        this.groupOrderId!,
        Order.createFromForm(this.form)
      ).subscribe();
      this.form.reset();
      this.orderListComponent.clearItems();
    } else {
      this.empty = true;
    }
  }

}
