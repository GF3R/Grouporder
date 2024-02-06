import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export class Order {
  id?: string;
  customerName: string;
  items: string[];
  total: number;
  value: any;

  constructor(
    customerName: string,
    items: string[],
    total: number
  ) {
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
      customerName: [this.customerName, Validators.required],
      items: [this.items, Validators.required],
      total: [this.total, Validators.required],
    });
  }

  static createFromForm(
    form: FormGroup<{
      customerName: FormControl;
      items: FormControl;
      total: FormControl;
    }>,
  ): Order {
    return new Order(
      form.value.customerName,
      form.value.items,
      form.value.total
    );
  }


}
