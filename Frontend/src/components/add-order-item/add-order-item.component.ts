import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Order } from 'src/model/Order';
import { GrouporderService } from 'src/services/grouporder.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-order-item',
  templateUrl: './add-order-item.component.html',
  styleUrls: ['./add-order-item.component.css'],
})
export class AddOrderItemComponent implements OnInit {
  parentItems: string[] = [];

  form: FormGroup<{
    customerName: FormControl;
    items: FormControl;
    total: FormControl;
  }>;
  currentGroupOrderId: any;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: GrouporderService,
    private route: ActivatedRoute,
  ) {
    this.form = new Order('', [], null).createFormGroup(this.formBuilder);
    this.orderService.foodItems$.subscribe(items => {
      this.parentItems = items;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.currentGroupOrderId = params['id'];
    });
  }

  getErrorMessage(controlName: string): string {
    if (controlName === 'customerName') {
      return 'Customername is required';
    } else if (controlName === 'total') {
      if (this.form.get('total')!.hasError('pattern')) {
        return 'Total must contain only digits';
      } else {
        return 'Total is required';
      }
    }
    return '';
  }

  addToOrder() {
    if (this.parentItems.length > 0) {
      const order = new Order(
        this.form.get('customerName')!.value,
        this.parentItems.map(item => ({ id: '', name: item })),
        this.form.get('total')!.value
      );
      this.orderService.addCustomerOrderWithValidation(
        this.currentGroupOrderId,
        order
      ).subscribe(() => {
        this.orderService.getCustomerOrdersFromGroupOrder(this.currentGroupOrderId).subscribe();
        this.form.reset();
        this.orderService.clearFoodItems();
      });
    }
  }
}
