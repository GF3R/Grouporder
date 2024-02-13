import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GrouporderService } from 'src/services/grouporder.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  items: { id: string, name: string }[] = [];
  currentItem = '';

  itemFormControl = new FormControl('', [Validators.required]);

  constructor(private orderService: GrouporderService) {
    this.orderService.foodItems$.subscribe(items => {
      this.items = items.map((item, index) => ({ id: index.toString(), name: item }));
    });

  }

  ngOnInit() {
    this.itemFormControl.valueChanges.subscribe(value => {
      this.currentItem = value!;
    });
  }

  getErrorMessage() {
    if (this.itemFormControl!.hasError('required')) {
      return 'Item is required';
    }
    return '';
  }

  addItem() {
    if (!this.currentItem) {
      this.itemFormControl.markAsTouched();
      this.itemFormControl.setErrors({ 'required': true });
    } else {
      this.orderService.addFoodItem(this.currentItem);
      this.currentItem = '';
      this.itemFormControl.setValue('');
    }
  }

  deleteItem(item: { id: string, name: string }) {
    this.items = this.items.filter(i => i.id !== item.id);
    this.orderService.deleteFoodItem(item.name);
  }

}
