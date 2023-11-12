import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  @Input() items: string[] = [];

  currentItem = '';

  constructor() {}

  ngOnInit() {}

  addItem() {
    this.items.push(this.currentItem);
    this.currentItem = '';
  }
}
