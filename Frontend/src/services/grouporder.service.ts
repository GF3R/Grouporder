import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { GroupOrder } from 'src/model/GroupOrder';
import { Order } from 'src/model/Order';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class GrouporderService {

  private url = 'https://localhost:7208/Bestellung';

  private groupOrdersSubject = new BehaviorSubject<GroupOrder[]>([]);
  public groupOrders$ = this.groupOrdersSubject.asObservable();

  private customerOrdersSubject = new BehaviorSubject<Order[]>([]);
  public customerOrders$ = this.customerOrdersSubject.asObservable();

  private foodItemsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  foodItems$: Observable<string[]> = this.foodItemsSubject.asObservable();

  constructor(private http: HttpClient) { }

  clearFoodItems(): void {
    this.foodItemsSubject.next([]);
  }

  private handleError<T>(_operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getActiveGroupOrders(): Observable<GroupOrder[]> {
    const url = `${this.url}/getActiveGroupOrders`;
    return this.http.get<GroupOrder[]>(url).pipe(
      tap((orders: GroupOrder[]) => this.groupOrdersSubject.next(orders)),
      catchError(this.handleError<GroupOrder[]>(`getActiveGroupOrders`))
    );
  }

  addGroupOrderWithValidation(newGroupOrder: GroupOrder): Observable<GroupOrder[]> {
    const currentGroupOrders = this.groupOrdersSubject.getValue();
    const updatedGroupOrders = [...currentGroupOrders, newGroupOrder];
    this.groupOrdersSubject.next(updatedGroupOrders);

    const url = `${this.url}/addGroupOrder`;
    return this.http.post<GroupOrder[]>(url, newGroupOrder).pipe(
      catchError(this.handleError<GroupOrder[]>('addGroupOrder'))
    );
  }

  deleteGroupOrders(id: string): Observable<GroupOrder[]> {
    const url = `${this.url}/deleteGroupOrder/${id}`;
    this.groupOrdersSubject.next(this.groupOrdersSubject.value.filter(order => order.id !== id));
    return this.http.delete<GroupOrder[]>(url).pipe(
      catchError(this.handleError<GroupOrder[]>('deleteGroupOrder'))
    );
  }

  updateGroupOrder(order: GroupOrder, id: string): Observable<any> {
    const url = `${this.url}/updateGroupOrder/${id}`;
    return this.http.put(url, order).pipe(
      catchError(this.handleError<any>('updateGroupOder'))
    );
  }

  getCustomerOrdersFromGroupOrder(id: string): Observable<Order[]> {
    const url = `${this.url}/${id}/getCustomerOrders`;
    return this.http.get<Order[]>(url).pipe(
      tap((orders: Order[]) => this.customerOrdersSubject.next(orders)),
      catchError(this.handleError<Order[]>(`getCustomerOrders of groupOrder with id=${id}`))
    );
  }

  addCustomerOrderWithValidation(id: string, order: Order): Observable<string | Order[]> {
    if (!order.customerName || !order.items || !order.total) {
      return of('Please fill in all required fields.');
    }
    const currentCustomerOrders = this.customerOrdersSubject.getValue();
    const updatedCustomerOrders = [...currentCustomerOrders, order];
    this.customerOrdersSubject.next(updatedCustomerOrders);

    const url = `${this.url}/${id}/addCustomerOrder`;
    return this.http.post<Order[]>(url, order).pipe(
      catchError(this.handleError<Order[]>('addCustomerOrder'))
    );
  }

  updateCustomerOrder(order: Order, id: string): Observable<any> {
    const url = `${this.url}/${id}/updateCustomerOrder`;
    return this.http.put(url, order).pipe(
      catchError(this.handleError<any>('updateCustomerOrder'))
    );
  }

  deleteCustomerOrder(id: string): Observable<Order[]> {
    const url = `${this.url}/deleteCustomerOrder/${id}`;
    this.customerOrdersSubject.next(this.customerOrdersSubject.value.filter(order => order.id !== id)); // Remove the deleted order from the subject
    return this.http.delete<Order[]>(url).pipe(
      catchError(this.handleError<Order[]>('deleteCustomerOrder'))
    );
  }

  addFoodItem(item: string): Observable<string[]> {
    const currentItems = this.foodItemsSubject.getValue();
    const updatedItems = [...currentItems, item];
    this.foodItemsSubject.next(updatedItems);

    const url = `${this.url}/addItem`;
    return this.http.post<string[]>(url, item).pipe(
      catchError(this.handleError<string[]>('addItem'))
    );
  }

  deleteFoodItem(index: number): Observable<void> {
    const currentItems = this.foodItemsSubject.getValue();
    const updatedItems = currentItems.filter((item, i) => i !== index);
    this.foodItemsSubject.next(updatedItems);

    const url = `${this.url}/deleteItem/${index}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError<void>('deleteItem'))
    );
  }

}
