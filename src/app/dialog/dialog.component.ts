import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Purchase } from '../purchase';
import { PurchasesComponent } from '../purchases/purchases.component';
import { FormControl, Validators } from '@angular/forms';
import { Category } from '../category';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent {
  count!: number;
  name!: string;
  price!: number;
  category!: Category

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Purchase,
    public dialogRef: MatDialogRef<Purchase>
  ){
    
  }
  categories: Category[] = [{ name: 'Groceries', color: '#16a34a' }, { name: 'Education', color: '#0e7490' }, { name: 'Mobility', color: '#fb923c' }, { name: 'Luxury', color: '#facc15' }, { name: 'Hobbies', color: '#a78bfa' }, { name: 'Clothing', color: '#f43f5e' }, { name: 'Other', color: '#27272a' }];

  numberFormControl = new FormControl(this.data.count, [Validators.required, Validators.pattern(/^\d+$/)]);
  nameFormControl = new FormControl(this.data.name, [Validators.required]);
  categoryFormControl = new FormControl(this.data.category.name, [Validators.required]);
  priceFormControl = new FormControl(this.data.price, [Validators.required, Validators.pattern(/^\d+(.\d+)?$/)])
  
  save() {
    this.dialogRef.close({
      id: this.data.id,
      count: this.count,
      name: this.name,
      price: this.price,
      categoryName: this.category
    })
  }

  updateValues(count: number, name: string, price: number, category: Category) {
    this.count = count;
    this.name = name;
    this.price = price;
    this.category = category;
    this.save();
  }
}


