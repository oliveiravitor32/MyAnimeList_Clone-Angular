import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormatDatePipe } from '../../pipes/format-date.pipe';

@NgModule({
  declarations: [FormatDatePipe],
  imports: [CommonModule],
  exports: [FormatDatePipe],
})
export class SharedPipesModule {}
