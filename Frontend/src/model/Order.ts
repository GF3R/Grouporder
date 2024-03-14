import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class Order {
  [x: string]: any;
  id?: string;
  customerName: string;
  items: { id: string, name: string }[];
  total: number;

  constructor(
    customerName: string,
    items: { id: string, name: string }[],
    total: number | null
  ) {
    this.customerName = customerName;
    this.items = items;
    this.total = total!;
  }

  createFormGroup(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      customerName: [this.customerName, [Validators.required]],
      items: [this.items, [Validators.required]],
      total: [this.total, [Validators.required]],
    });
  }

  static createFromForm(
    form: FormGroup
  ): Order {
    return new Order(
      form.value.customerName,
      form.value.items,
      form.value.total
    );
  }
}
