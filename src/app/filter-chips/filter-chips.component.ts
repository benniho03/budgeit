import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../category';

@Component({
  selector: 'app-filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.css']
})
export class FilterChipsComponent {
  
  @Input() categories: Category[] = []
  
  @Output()
  filteredCategoryChanged = new EventEmitter<string>();

  activeCategory : Category = {name: "", color: ""}
  filteredCategoryName: string = ""
  
  onFilteredCategoryChange() {
    this.filteredCategoryChanged.emit(this.filteredCategoryName);
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
