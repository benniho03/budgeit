import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Purchase } from './purchase';


@Injectable({
  providedIn: 'root'
})
export class PurchasesService extends Dexie{

  purchases!: Dexie.Table<Purchase, number>

  constructor() {
    super('purchases');
    this.version(1).stores({
      purchases: 'id'
    })
  }

  async add(name: string, count: number, price: number) {
    const purchase = {id: crypto.randomUUID() , name, count, price};

    await this.purchases.add(purchase);
  }

  async getAll() {
    return await this.purchases.toArray();
  }

  async bulkPut(purchaseArray: Purchase[]) {
    await this.purchases.bulkPut(purchaseArray);
  }

}
