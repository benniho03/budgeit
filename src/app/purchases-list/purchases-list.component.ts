import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../category';
import { DialogComponent } from '../dialog/dialog.component';
import { Purchase } from '../purchase';
import { PurchasesService } from '../purchases.service';

@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.css']
})
export class PurchasesListComponent {

  @Input() purchases: Purchase[] = [];
  @Input() categories: Category[] = []; 
  @Input() searchText: string = '';
  @Input() filteredCategoryName: string = '';
  activeCategory: Category = { name: '', color: '' };

  @Output()
  refresh: EventEmitter<true> = new EventEmitter(true);


  constructor(
    private purchaseService: PurchasesService,
    public dialog: MatDialog
  ) {}

  openDialog(
    id: number,
    name: string,
    count: number,
    price: number,
    category: Category,
    allCategories: Category[]
  ) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        id: id,
        name: name,
        count: count,
        price: price,
        category: category,
        allCategories: allCategories
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (!result.id) return;
      result.category = {
        name: result.categoryName,
        color: this.categories.find((cat) => cat.name === result.categoryName)!
          .color,
      };
      this.purchaseService.editEntry(result);
      this.refresh.emit();
    });
  }

  async delete(id: string) {
    await this.purchaseService.deleteEntry(id);
    await this.refresh.emit();
  }

  formatDate(date: Date) {
    const dateArray: string[] = [
      date.toLocaleDateString('en-UK', { weekday: 'short' }),
      date.toLocaleDateString('en-UK', { month: '2-digit', day: 'numeric' }),
    ];
    return dateArray;
  }

  isActiveCategory(category: Category): boolean {
    
    return category.name === this.activeCategory.name;

  }

  setActiveCategory(category: Category) {
    if (this.activeCategory.name === category.name) {
      this.activeCategory = { name: '', color: '' };
    } else {
      this.activeCategory = category;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.purchases, event.previousIndex, event.currentIndex);
  }
}
