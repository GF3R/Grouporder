import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GrouporderService } from 'src/services/grouporder.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  @Input() items: string[] = [];
  @Input() empty: boolean | undefined;

  currentItem = '';

  selectedIndices: number[] = [];

  constructor(private orderService: GrouporderService) { }

  ngOnInit() { }

  addItem() {
    this.orderService.addFoodItem(this.currentItem);
    this.currentItem = '';
  }

  clearItems() {
    this.items = [];
  }

  toggleSelection(index: number) {
    const selectedIndex = this.selectedIndices.indexOf(index);
    if (this.selectedIndices.length === 1) {
      if (selectedIndex !== -1) {
        this.selectedIndices.splice(selectedIndex, 1);
      } else {
        this.selectedIndices = [];
        this.selectedIndices.push(index);
      }
    } else {
      this.selectedIndices.push(index);
    }
  }

  deleteSelected() {
    this.items = this.items.filter((item, index) => !this.selectedIndices.includes(index));
    this.selectedIndices = [];
  }

  isSelected(index: number): boolean {
    return this.selectedIndices.includes(index);
  }

}
