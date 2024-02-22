import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GroupOrder } from 'src/model/GroupOrder';
import { GrouporderService } from 'src/services/grouporder.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})

export class OrdersComponent implements OnInit {
  displayedColumns = ['Index', 'Customer', 'Order Total', 'actions'];
  groupOrders$ = this.groupOrderService.groupOrders$;
  editModeMap: Map<string, boolean> = new Map();
  groupOrderForm: FormGroup<{
    name: FormControl;
  }>;

  constructor(private groupOrderService: GrouporderService, private formBuilder: FormBuilder) {
    this.groupOrderForm = new GroupOrder('').createFormGroup(this.formBuilder);
  }

  ngOnInit() {
    this.groupOrderService.getActiveGroupOrders().subscribe();

  }

  get name() {
    return this.groupOrderForm.get('name');
  }

  addGroupOrder() {
    if (this.name!.value) {
      this.groupOrderService.addGroupOrderWithValidation(this.name!.value
      ).subscribe(() => {
        this.groupOrderService.getActiveGroupOrders().subscribe();
        this.groupOrderForm.reset();
      });
    }
  }

  toggleEditMode(id: string) {
    this.editModeMap.set(id, !this.editModeMap.get(id));
  }

  isEditMode(id: string): boolean {
    return this.editModeMap.get(id) || false;
  }

  saveChanges(name: string, id: string) {
    this.groupOrderService.updateGroupOrder(name, id).subscribe(() => { this.groupOrderService.getActiveGroupOrders().subscribe(); });
    this.editModeMap.set(id, false);
  }

  cancelEdit(id: string) {
    this.groupOrderService.getActiveGroupOrders().subscribe();
    this.editModeMap.set(id, false);
  }

  deleteOrder(id: string) {
    this.groupOrderService.deleteGroupOrders(id).subscribe();
  }

}


