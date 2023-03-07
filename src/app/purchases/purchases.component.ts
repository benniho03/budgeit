import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject } from '@angular/core';
import { Purchase } from '../purchase';
import { PurchasesService } from '../purchases.service';
import { SyncService } from '../sync.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css'],
})
export class PurchasesComponent {
  purchases: Purchase[] = [];
  totalExpenses: number = 0;

  constructor(
    private purchaseService: PurchasesService,
    private syncService: SyncService,
    public dialog: MatDialog
  ) {
    this.refresh();
  }

  async refresh() {
    this.totalExpenses = await this.getTotalExpenses();
    this.purchases = await this.purchaseService.getAll();
  }

  async getTotalExpenses() {
    const allPurchases = await this.purchaseService.getAll();
    this.totalExpenses = 0;
    allPurchases.forEach((purchase) => {
      this.totalExpenses += purchase.count * purchase.price;
    });

    return this.totalExpenses;
  }

  async add(name: string, count: number, price: number) {
    await this.purchaseService.add(name, count, price);
    await this.refresh();
  }

  async sync() {
    await this.syncService.sync();
    await this.refresh();
  }

  async delete(id: string) {
    await this.purchaseService.deleteEntry(id);
    await this.refresh();
  }

  openDialog(id: string, name: string, count: number, price: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        id: id,
        name: name,
        count: count,
        price: price
      },
    });
    

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result.count}`);
      this.purchaseService.editEntry(result);
      this.refresh();
    });
  }

  //Styling methods
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.purchases, event.previousIndex, event.currentIndex);
  }
}

