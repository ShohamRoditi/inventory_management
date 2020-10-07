// import { response } from './../response/response';
import { InventoryService } from './../inventory/inventory.service';
import { MessageService } from './../messages/messages.service';
import { Item } from './item';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private ItemsUrl = 'http://localhost:3000/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
  private http: HttpClient,
  private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.addMsg(`ItemService: ${message}`);
  }
  
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(
      this.ItemsUrl + 'addItem', item, this.httpOptions
      ).pipe(
      tap(_=>this.log('add item')),
      catchError(this.handleError<Item>('addItem'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); 
  
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  
    /** DELETE: delete the item from the server */
  deleteItem(_id : string): Observable<Item> {
    const url = `${this.ItemsUrl}deleteItem?_id=${_id}`;

    return this.http.delete<Item>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${_id}`)),
      catchError(this.handleError<Item>('deleteItem'))
    );
  }

  /** PUT: update the item on the server */
  updateItem(_id: string, name: string, description: string, count: number): Observable<any> {
    const updateItem = {_id, name, description, count}
    return this.http.put(this.ItemsUrl + `updateItem/${_id}`, updateItem, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }
  /** PUT */
  depositItem(_id: string, amount: number): Observable<any> {
    return this.http.put(this.ItemsUrl + `depositItem/?_id=${_id}&amount=${amount}`, this.httpOptions).pipe(
      tap(_ => this.log(`deposit item`)),
      catchError(this.handleError<any>('depositItem'))
    );

  }
  /** PUT */
  withdrawItem(_id: string, amount: number): Observable<any> {
    return this.http.put(this.ItemsUrl + `withdrawItem/?_id=${_id}&amount=${amount}`, this.httpOptions).pipe(
      tap(_ => this.log(`withdraw item`)),
      catchError(this.handleError<any>('withdrawItem'))
    );

  }
}
