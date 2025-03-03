import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { categoryTypeArray } from '../../../utils/category-type-description-map';
import { CategoryTypeEnum } from '../../../enums/categoy-type.enum';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  @Input({ required: true }) searchForm!: FormGroup;
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
