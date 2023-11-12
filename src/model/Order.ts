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

  createFormGroup(formBuilder: FormBuilder): FormGroup<{
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

  static createFromForm(
    id: number,
    form: FormGroup<{
      customerName: FormControl;
      items: FormControl;
      total: FormControl;
    }>,
    items: string[]
  ): Order {
    return new Order(
      id,
      form.value.customerName,
      form.value.items,
      form.value.total
    );
  }
}
