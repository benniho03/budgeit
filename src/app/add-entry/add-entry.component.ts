import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Category } from '../category';
import { PurchasesService } from '../purchases.service';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent {

  @Output()
  refresh: EventEmitter<true> = new EventEmitter(true);

  constructor(
    private purchaseService: PurchasesService,
  ) {}

  categories: Category[] = [
    { name: 'Groceries', color: '#16a34a' },
    { name: 'Education', color: '#0e7490' },
    { name: 'Mobility', color: '#fb923c' },
    { name: 'Luxury', color: '#facc15' },
    { name: 'Hobbies', color: '#a78bfa' },
    { name: 'Clothing', color: '#f43f5e' },
    { name: 'Other', color: '#27272a' },
  ];

  numberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d+$/),
  ]);
  requiredFormControl = new FormControl('', [Validators.required]);
  priceFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d+(.\d+)?$/),
  ]);

  async add(name: string, count: number, price: number, category: string) {
    const color = this.categories.find((cat) => cat.name === category)!.color;
    await this.purchaseService.add(name, count, price, {
      name: category,
      color: color.toString(),
    });
    await this.refresh.emit();
  }

}
