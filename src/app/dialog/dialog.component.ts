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
  amount!: number;
  name!: string;
  price!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Purchase,
    public dialogRef: MatDialogRef<PurchasesComponent>
  ){
    
  }

  closeDialog() {
    this.dialogRef.close({
      amount: this.amount,
      name: this.name,
      price: this.price
    })
  }

  updateValues(amount: number, name: string, price: number) {
    this.amount = amount;
    this.name = name;
    this.price = price;
  }
}
