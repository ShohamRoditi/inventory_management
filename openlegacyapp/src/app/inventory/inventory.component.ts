import { InventoryService } from './inventory.service';
import { MessageService } from './../messages/messages.service';
import { ItemService } from './../item/item.service';
import { Component, OnInit } from '@angular/core';
import { Item } from '../item/item';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  selectedItem : Item
  errors = []

  constructor (
  private messageService: MessageService ,
  public inventoryService: InventoryService,
  public itemService: ItemService
  ) 
  { }

  ngOnInit(): void {
    this.getItems();
  }

  onSelect(item: Item): void {
    this.selectedItem = item;
    this.messageService.add(`ItemsComponent: Selected item id=${item._id}`, item);
  }
  
  addToInventory(item: Item){
    this.inventoryService.addToInventory(item)

  }
  getItems(): void {
    this.inventoryService.getItems()
      .subscribe(items => this.inventoryService.allItems = items)
  }

  delete(_id: string): void {
    this.inventoryService.inventory = this.inventoryService.inventory.filter(item => item._id !== _id);
  }

  deleteFromAllItems(_id:string): void {
        this.inventoryService.allItems = this.inventoryService.allItems.filter(item => item._id !== _id);
        this.itemService.deleteItem(_id).subscribe();
        this.selectedItem = undefined
  }

  save(_id: string, name: string, description: string, count: number): void {
    this.itemService.updateItem(_id, name, description, count)
      .subscribe((res) => {
        const indexAllItems = this.inventoryService.allItems.findIndex(i => i._id === _id)
        this.inventoryService.allItems.splice(indexAllItems, 1, res.params)
        const indexInventory = this.inventoryService.inventory.findIndex(i => i._id === _id)
        this.selectedItem = res.params
        if (indexInventory >= 0)
          this.inventoryService.inventory.splice(indexInventory, 1, res.params)
      });
  }

  deposit(_id: string, amount: number){
    console.log(_id, amount)
    this.itemService.depositItem(_id, amount)
      .subscribe(res=> {
        const indexAllItems = this.inventoryService.inventory.findIndex(i => i._id === _id)
        this.inventoryService.inventory.splice(indexAllItems, 1, res.params)
        console.log(res.params)
        this.selectedItem = res.params
        console.log(res.params)
      })
  }

  widthdraw(_id: string, amount: number){
    this.itemService.withdrawItem(_id, amount)
      .subscribe(res=>{
        if(res.result==="Success"){
          const indexAllItems = this.inventoryService.inventory.findIndex(i => i._id === _id)
          this.inventoryService.inventory.splice(indexAllItems, 1, res.params)
          this.selectedItem = res.params
        }
    })
  }
}