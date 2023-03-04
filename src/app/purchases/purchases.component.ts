import { Component } from '@angular/core';
import { Purchase } from '../purchase';
import { PurchasesService } from '../purchases.service';
import { SyncService } from '../sync.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css'],
})
export class PurchasesComponent {
  purchases: Purchase[] = [];

  constructor(
    private purchaseService: PurchasesService,
    private syncService: SyncService
  ) {
    this.refresh();
  }

  async refresh() {
    this.purchases = await this.purchaseService.getAll();
  }

  async add(name: string, count: number, price: number) {
    await this.purchaseService.add(name, count, price);
    await this.refresh();
  }

  async sync() {
    await this.syncService.sync();
    await this.refresh();
  }

  async delete(id : string){
    await this.purchaseService.deleteEntry(id)
    await this.refresh()
  }
}
