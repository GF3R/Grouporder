import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from './Order';

export class GroupOrder {
  id?: string;
  name?: string;
  orders?: Order[];
  total?: number;

  constructor(name: string) {
    this.name = name;
  }

  createFormGroup(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  static createFromForm(
    form: FormGroup
  ): GroupOrder {
    return new GroupOrder(
      form.value.name
    );
  }

}
