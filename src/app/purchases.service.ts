import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Category } from './category';
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

  async add(name: string, count: number, price: number, category: Category) {
    const currentDate = new Date();
    const purchase = {id: crypto.randomUUID(), name, count, price, createdAt: currentDate, category};

    await this.purchases.add(purchase);
  }

  async getAll() {
    return await this.purchases.toArray();
  }

  async bulkPut(purchaseArray: Purchase[]) {
    await this.purchases.bulkPut(purchaseArray);
  }

  async deleteEntry(id :string){
    await this.purchases.delete(id);
  }

  async editEntry(purchase: Purchase) {
    await this.purchases.update(purchase.id, {
      count: purchase.count,
      name: purchase.name,
      price: purchase.price
    });
  }

}
