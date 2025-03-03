import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchBarComponent } from './search-bar.component';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';

@NgModule({
  declarations: [SearchBarComponent, SearchResultItemComponent],
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  exports: [SearchBarComponent],
})
export class SearchBarModule {}
