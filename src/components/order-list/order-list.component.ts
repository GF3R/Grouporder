import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  @Input() items: string[] = [];
  @Output() itemsChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Input() empty: boolean | undefined;

  currentItem = '';

  selectedIndices: number[] = [];

  constructor() { }

  ngOnInit() { }

  addItem() {
    this.items.push(this.currentItem);
    this.currentItem = '';
    this.emitItems();
  }

  clearItems() {
    this.items = [];
  }

  private emitItems() {
    this.itemsChange.emit(this.items);
  }

  toggleSelection(index: number) {
    console.log("dsaölk", this.selectedIndices, this.items)
    const selectedIndex = this.selectedIndices.indexOf(index);

    if (selectedIndex !== -1) {
      this.selectedIndices.splice(selectedIndex, 1);
    } else {
      this.selectedIndices.push(index);
    }
  }

  deleteSelected() {
    this.items = this.items.filter((item, index) => !this.selectedIndices.includes(index));
    this.selectedIndices = [];
  }

  // isSelected(index: number): boolean {
  //   return this.selectedIndices.includes(index);
  // }

}
