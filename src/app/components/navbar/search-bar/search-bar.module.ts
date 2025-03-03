import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchBarComponent } from './search-bar.component';
import { SearchResultsComponent } from './search-results/search-results.component';

@NgModule({
  declarations: [SearchBarComponent, SearchResultsComponent],
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  exports: [SearchBarComponent],
})
export class SearchBarModule {}
