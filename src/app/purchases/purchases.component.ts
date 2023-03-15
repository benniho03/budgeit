import { Component } from '@angular/core';
import { Purchase } from '../purchase';
import { PurchasesService } from '../purchases.service';
import { Category } from '../category';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css'],
})
export class PurchasesComponent {
  purchases: Purchase[] = [];
  totalExpenses: number = 0;
  searchText: string = '';
  categories: Category[] = [
    { name: 'Groceries', color: '#16a34a' },
    { name: 'Education', color: '#0e7490' },
    { name: 'Mobility', color: '#fb923c' },
    { name: 'Luxury', color: '#facc15' },
    { name: 'Hobbies', color: '#a78bfa' },
    { name: 'Clothing', color: '#f43f5e' },
    { name: 'Other', color: '#27272a' },
  ];
  filteredCategoryName: string = '';
  activeCategory: Category = { name: '', color: '' };

  log(content: string) {
    console.log(content);
  }

  constructor(
    private purchaseService: PurchasesService
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



  setActiveCategory(category: Category) {
    if (this.activeCategory.name === category.name) {
      this.activeCategory = { name: '', color: '' };
    } else {
      this.activeCategory = category;
    }
  }

  isActiveCategory(category: Category) {
    return category.name === this.activeCategory.name;
  }


}
