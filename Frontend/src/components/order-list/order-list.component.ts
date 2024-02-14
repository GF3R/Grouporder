import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GrouporderService } from 'src/services/grouporder.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  items: string[] = [];
  currentItem = '';
  itemFormControl = new FormControl('', [Validators.required]);

  constructor(private orderService: GrouporderService) {
    this.orderService.foodItems$.subscribe(items => {
      this.items = items;
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
    this.orderService.addFoodItem(this.currentItem);
    this.itemFormControl.setValue(null);
    this.currentItem = '';
  }

  deleteItem(index: number) {
    this.orderService.deleteFoodItem(index);
  }

}
