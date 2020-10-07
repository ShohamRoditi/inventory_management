import { ItemService } from './item.service';
// import { InventoryComponent } from './../inventory/inventory.component';
import { InventoryService } from './../inventory/inventory.service';
import { MessageService } from './../messages/messages.service';
import { Component, OnInit } from '@angular/core';
import { Item } from './item';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item: Item = {
    _id: "",
    name: '',
    description: '',
    count: 1
  };

  constructor(
  private messageService: MessageService ,
  public inventoryService: InventoryService,
  // public inventoryComponent: InventoryComponent,
  public itemService: ItemService)  { 
  }

addItem(name: string, description: string, count: number): void {
    // this.selectedItem = item;
    const _id = null
    this.item = {_id, name, description, count}
    this.itemService.addItem(this.item)
      .subscribe(res=>{
        const stringRes = JSON.stringify(res)
        this.item = JSON.parse(stringRes).params
        this.inventoryService.allItems.push(this.item)
      })
    this.messageService.add(`ItemsComponent: Added item id=${this.item._id}`, this.item);
  }

  // delete(_id: string): void {
  //   this.inventoryService.allItems = this.inventoryService.allItems.filter(h => h._id !== _id);
  //   console.log(this.inventoryService.allItems)
  //   this.itemService.deleteItem(_id).subscribe(res => console.log(res));
  // }

  ngOnInit(): void {
  }

}