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

  createFormGroup(formBuilder: FormBuilder): FormGroup<{
    name: FormControl;
  }> {
    return formBuilder.group({
      name: [this.name],
    });
  }

  static createFromForm(
    form: FormGroup<{
      name: FormControl;
    }>,
  ): GroupOrder {
    return new GroupOrder(

      form.value.name
    );
  }

}
