import { Item } from './../item/item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  inventory: Item[] = [];

  add(message: string, item: Item) {
    this.messages.push(message);
    this.inventory.push(item);
  }
  addMsg(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}