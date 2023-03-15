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
import { Category } from '../category';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css'],
})
export class PurchasesComponent {
  purchases: Purchase[] = [];
  totalExpenses: number = 0;
  searchText: string = "";
  categories: Category[] = [{ name: 'Groceries', color: '#873e23' }, { name: 'Education', color: '#e28743' }, { name: 'Mobility', color: '#1e81b0' }, { name: 'Luxury', color: '#b0a51e' }, { name: 'Hobbies', color: '#b01e81' }, { name: 'Clothing', color: '#6a1eb0' }, { name: 'Other', color: 'grey' }];

  numberFormControl = new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]);
  requiredFormControl = new FormControl('', [Validators.required]);
  priceFormControl = new FormControl('', [Validators.required, Validators.pattern(/^\d+(.\d+)?$/)])

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

  async add(name: string, count: number, price: number, category: string) {
    const color = this.categories.find(cat => cat.name === category)!.color;
    await this.purchaseService.add(name, count, price, { "name": category, "color": color.toString() });
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
      if (!result.id) return;
      this.purchaseService.editEntry(result);
      this.refresh();
    });
  }

  formatDate(date : Date) {
    const dateArray : string[] = [date.toLocaleDateString("en-UK", { weekday: 'short' }), date.toLocaleDateString("en-UK", { month: '2-digit', day: 'numeric' })];
    return dateArray
  }

  //Styling methods
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.purchases, event.previousIndex, event.currentIndex);
  }
}

