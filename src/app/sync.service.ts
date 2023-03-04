import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PurchasesService } from './purchases.service';
import { firstValueFrom } from 'rxjs'
import { Purchase } from './purchase';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(private purchasesService: PurchasesService, private httpClient: HttpClient) {

  }

  async sync(){
    const allPurchases = await this.purchasesService.getAll()

    const mergedPurchases = await firstValueFrom(this.httpClient.post<Purchase[]>('http://localhost:3030/sync', allPurchases))

    await this.purchasesService.bulkPut(mergedPurchases);
  }
}
