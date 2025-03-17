import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { PostShowcaseComponent } from './post-showcase/post-showcase.component';

@NgModule({
  declarations: [HomeComponent, PostShowcaseComponent],
  imports: [CommonModule, NgOptimizedImage],
  exports: [HomeComponent],
})
export class HomeModule {}
