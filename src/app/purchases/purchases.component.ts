import { Component } from '@angular/core';
import { Purchase } from '../purchase';
import { PurchasesService } from '../purchases.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent {

  purchases: Purchase[] = [];
  
  constructor(private purchaseService: PurchasesService){
    this.refresh()
  }

  async refresh() {
    this.purchases = await this.purchaseService.getAll();
  }

  async add(name: string, count: number, price: number){
    await this.purchaseService.add(name, count, price);
    await this.refresh();
  }

}
