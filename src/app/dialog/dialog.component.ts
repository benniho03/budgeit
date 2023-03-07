import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Purchase } from '../purchase';
import { PurchasesComponent } from '../purchases/purchases.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  count!: number;
  name!: string;
  price!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Purchase,
    public dialogRef: MatDialogRef<Purchase>
  ){
    
  }

  save() {
    this.dialogRef.close({
      id: this.data.id,
      count: this.count,
      name: this.name,
      price: this.price
    })
  }

  updateValues(count: number, name: string, price: number) {
    this.count = count;
    this.name = name;
    this.price = price;
    this.save();
  }
}
