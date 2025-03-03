import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AnimesResponseDataList } from '../../../types/animes-response-data-list';
import { categoryTypeArray } from '../../../utils/category-type-description-map';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  @Input({ required: true }) searchForm!: FormGroup;
  @Input({ required: true }) searchedData: AnimesResponseDataList = [];

  @Output('onFormSubmit') onFormSubmitEmitt = new EventEmitter<void>();

  searchIcon = faMagnifyingGlass;
  closeIcon = faTimes;

  get categoryTypeArray() {
    return categoryTypeArray;
  }

  clearSearch() {
    this.searchForm.get('text')!.reset();
  }

  onSubmit() {
    // TODO
  }
}
