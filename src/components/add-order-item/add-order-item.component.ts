import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Order } from 'src/model/Order';

@Component({
  selector: 'app-add-order-item',
  templateUrl: './add-order-item.component.html',
  styleUrls: ['./add-order-item.component.css'],
})
export class AddOrderItemComponent implements OnInit {
  @Input() groupOrderId: number | undefined;

  @Input() order: Order | undefined;

  form: FormGroup<{
    customerName: FormControl;
    items: FormControl;
    total: FormControl;
  }>;
  constructor(private formBuilder: FormBuilder) {
    if (this.order === undefined) {
      this.order = new Order(0, '', [], 0);
    }

    this.form = this.order.createFormGroup(this.formBuilder);
  }

  ngOnInit() {}
}
