import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupOrder } from 'src/model/GroupOrder';
import { GrouporderService } from 'src/services/grouporder.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  currentOrder: GroupOrder | undefined;

  constructor(
    private route: ActivatedRoute,
    private grouporderService: GrouporderService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      this.grouporderService
        .getGroupOrder(Number(params.get('id')))
        .subscribe((order) => {
          this.currentOrder = order;
        });
    });
  }
}
