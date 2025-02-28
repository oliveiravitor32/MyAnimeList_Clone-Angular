import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TopLinksRankingsComponent } from './top-links-rankings/top-links-rankings.component';

@NgModule({
  declarations: [FooterComponent, AboutUsComponent, TopLinksRankingsComponent],
  imports: [CommonModule],
  exports: [FooterComponent],
})
export class FooterModule {}
