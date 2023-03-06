import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Purchase } from './purchase';


@Injectable({
  providedIn: 'root'
})
export class PurchasesService extends Dexie{

  purchases!: Dexie.Table<Purchase, string>

  constructor() {
    super('purchases');
    this.version(1).stores({
      purchases: 'id'
    })
  }

  async add(name: string, count: number, price: number) {
    const currentDate = new Date();
    const purchase = {id: crypto.randomUUID(), name, count, price, createdAt: currentDate};

    await this.purchases.add(purchase);
  }

  async getAll() {
    return await this.purchases.toArray();
  }

  async bulkPut(purchaseArray: Purchase[]) {
    await this.purchases.bulkPut(purchaseArray);
  }

  async deleteEntry(id :string){
    await this.purchases.delete(id)
  }

}
