import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AnimesResponseDataList } from '../../../types/animes-response-data-list';
import { categoryTypeArray } from '../../../utils/category-type-description-map';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements AfterViewInit {
  @Input({ required: true }) searchForm!: FormGroup;
  @Input({ required: true }) searchedData: AnimesResponseDataList = [];

  @Output('onFormSubmit') onFormSubmitEmitt = new EventEmitter<void>();

  @ViewChild('searchTextInput') searchInput!: ElementRef<HTMLInputElement>;

  searchIcon = faMagnifyingGlass;
  closeIcon = faTimes;

  showResults = false;

  get categoryTypeArray() {
    return categoryTypeArray;
  }

  get searchedText() {
    return this.searchForm.get('text')?.value;
  }

  ngAfterViewInit() {
    this.watchInputTextFocusAndShowResults();
  }

  watchInputTextFocusAndShowResults() {
    this.searchInput.nativeElement.addEventListener('focus', () => {
      this.showResults = true;
    });

    this.searchInput.nativeElement.addEventListener('blur', () => {
      this.showResults = false;
    });
  }

  clearSearch() {
    this.searchForm.get('text')!.reset();
  }

  onSubmit() {
    // TODO
  }
}
