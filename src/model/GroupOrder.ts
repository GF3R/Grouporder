import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from './Order';

export class GroupOrder {
  id?: string;
  name?: string;
  orders?: Order[];
  total?: number;

  constructor(name: string) {
    // this.id = id;
    this.name = name;
    // this.orders = orders;
    // this.total = total;
    // this.total = orders.reduce((acc, order) => acc + order.total, 0);
  }

  createFormGroup(formBuilder: FormBuilder): FormGroup<{
    name: FormControl;
    // orders: FormControl;
    // total: FormControl;
  }> {
    return formBuilder.group({
      name: [this.name],
      // orders: [this.orders],
      // total: [this.total],
    });
  }

  // static createFromForm(
  //   id: string,
  //   form: FormGroup<{
  //     name: FormControl;
  //     orders: FormControl;
  //     total: FormControl;
  //   }>,
  //   orderItems: string[]
  // ): GroupOrder {
  //   const orders: Order[] | null | undefined = form.value.orders;

  //   const orderList: Order[] = orders ? orders.map((order: any) => {
  //     return new Order(
  //       order.id,
  //       order.customerName,
  //       order.items,
  //       order.total
  //     );
  //   }) : [];

  //   return new GroupOrder(
  //     id,
  //     form.value.name,
  //     orderList,
  //     +form.value.total
  //   );

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
