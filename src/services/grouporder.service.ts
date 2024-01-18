import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { GroupOrder } from 'src/model/GroupOrder';
import { Order } from 'src/model/Order';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class GrouporderService {

  private url = 'https://localhost:7208/WeatherForecast';

  private groupOrdersSubject = new BehaviorSubject<GroupOrder[]>([]);
  public groupOrders$ = this.groupOrdersSubject.asObservable();

  private customerOrdersSubject = new BehaviorSubject<Order[]>([]);
  public customerOrders$ = this.customerOrdersSubject.asObservable();

  currentOrderIdSubject = new BehaviorSubject<number | undefined>(undefined);

  constructor(private http: HttpClient) { }

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

  getCustomerOrdersFromGroupOrder(id: string): Observable<Order[]> {
    const url = `${this.url}/${id}/getCustomerOrders`;
    return this.http.get<Order[]>(url).pipe(
      tap((orders: Order[]) => this.customerOrdersSubject.next(orders)),
      catchError(this.handleError<Order[]>(`getCustomerOrders of groupOrder with id=${id}`))
    );
  }

  addCustomerOrderWithValidation(id: string, order: Order): Observable<string | Order[]> {
    console.log('Sending request with payload:', order);
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

  updateCustomerOrders(orders: Order[], id: string): Observable<any> {
    const url = `${this.url}/${id}/updateCustomerOrders`;
    return this.http.put(url, orders).pipe(
      tap(() => {
        this.customerOrdersSubject.next(orders);
      }),
      catchError(this.handleError<any>('updateCustomerOrders'))
    );
  }

  deleteCustomerOrder(ids: string[]): Observable<Order[]> {
    const url = `${this.url}/deleteCustomerOrders`;
    this.customerOrdersSubject.next(this.customerOrdersSubject.value.filter(order => !ids.includes(order.id!)));
    return this.http.delete<Order[]>(url, { body: ids }).pipe(
      catchError(this.handleError<Order[]>('deleteCustomerOrders')));
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

  deleteGroupOrders(ids: string[]): Observable<GroupOrder[]> {
    const url = `${this.url}/deleteGroupOrders`;
    this.groupOrdersSubject.next(this.groupOrdersSubject.value.filter((order) => !ids.includes(order.id!)));
    return this.http.delete<GroupOrder[]>(url, { body: ids }).pipe(
      catchError(this.handleError<GroupOrder[]>('deleteGroupOrders'))
    );
  }

  updateGroupOrder(orders: GroupOrder[]): Observable<any> {
    const url = `${this.url}/updateGroupOrders`;
    return this.http.put(url, orders, this.httpOptions).pipe(
      tap(_ => {
        this.groupOrdersSubject.next(orders);
      }),
      catchError(this.handleError<any>('updateGroupOders'))
    );
  }
}
