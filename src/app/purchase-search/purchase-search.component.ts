import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-purchase-search',
  templateUrl: './purchase-search.component.html',
  styleUrls: ['./purchase-search.component.css']
})
export class PurchaseSearchComponent {

  localSearchText: string = "";

  @Output()
  searchTextChanged = new EventEmitter<string>();

  onSearchTextChange() {
    this.searchTextChanged.emit(this.localSearchText);
  }

}
