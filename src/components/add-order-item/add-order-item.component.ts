import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Order } from 'src/model/Order';
import { GrouporderService } from 'src/services/grouporder.service';

@Component({
  selector: 'app-add-order-item',
  templateUrl: './add-order-item.component.html',
  styleUrls: ['./add-order-item.component.css'],
})
export class AddOrderItemComponent implements OnInit {
  @Input() groupOrderId!: number | null;

  @Input() order: Order | undefined;

  form: FormGroup<{
    customerName: FormControl;
    items: FormControl;
    total: FormControl;
  }>;
  constructor(
    private formBuilder: FormBuilder,
    private orderService: GrouporderService
  ) {
    if (this.order === undefined) {
      this.order = new Order(0, '', [], 0);
    }

    this.form = this.order.createFormGroup(this.formBuilder);
  }

  ngOnInit() {}

  addToOrder() {
    if (this.groupOrderId && this.order) {
      this.orderService.addOrderItem(
        this.groupOrderId,
        Order.createFromForm(99, this.form, this.order.items)
      );
    }
  }
}
