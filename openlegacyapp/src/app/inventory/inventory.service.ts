import { MessageService } from './../messages/messages.service';
import { Observable, of } from 'rxjs';
import { Item } from './../item/item';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  inventory: Item[] = [];
  allItems: Item[] = [];
  private ItemsUrl = 'http://localhost:3000/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }
  

  addToInventory(item: Item) {
    this.inventory.push(item);
  }

  private log(message: string) {
    this.messageService.addMsg(`ItemService: ${message}`);
  }

  getItems(): Observable<Item[]> {
    this.messageService.addMsg('ItemService: fetched items');
    return this.http.get<Item[]>(this.ItemsUrl + 'getItems')
    .pipe(
      tap(_ => this.log('fetched Items')),
      catchError(this.handleError<Item[]>('getItems', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error);
  
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
}
