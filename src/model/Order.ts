import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export class Order {
  id: number;
  customerName: string;
  items: string[];
  total: number;

  constructor(
    id: number,
    customerName: string,
    items: string[],
    total: number
  ) {
    this.id = id;
    this.customerName = customerName;
    this.items = items;
    this.total = total;
  }

  createFormGroup(
    formBuilder: FormBuilder
  ): FormGroup<{
    customerName: FormControl;
    items: FormControl;
    total: FormControl;
  }> {
    return formBuilder.group({
      customerName: [this.customerName],
      items: [this.items],
      total: [this.total],
    });
  }
}
