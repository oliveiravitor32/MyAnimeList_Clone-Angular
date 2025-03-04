import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchBarComponent } from './search-bar.component';
import { SearchResultsComponent } from './search-results/search-results.component';

import { NgOptimizedImage } from '@angular/common';
import { UtcDatePipe } from '../../../pipes/utc-date.pipe';
@NgModule({
  declarations: [SearchBarComponent, SearchResultsComponent, UtcDatePipe],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  exports: [SearchBarComponent],
})
export class SearchBarModule {}
