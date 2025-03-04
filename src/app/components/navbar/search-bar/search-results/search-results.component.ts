import { Component, Input } from '@angular/core';
import { AnimesResponseDataList } from '../../../../types/animes-response-data-list';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent {
  @Input({ required: true }) searchedData: AnimesResponseDataList = [];
  @Input({ required: true }) searchedText: string = '';
}
