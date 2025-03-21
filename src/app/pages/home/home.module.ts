import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AnimeLeaderboardComponent } from './anime-leaderboard/anime-leaderboard.component';
import { HomeComponent } from './home.component';
import { MediaCarouselComponent } from './media-carousel/media-carousel.component';
import { PostShowcaseComponent } from './post-showcase/post-showcase.component';

@NgModule({
  declarations: [
    HomeComponent,
    PostShowcaseComponent,
    AnimeLeaderboardComponent,
    MediaCarouselComponent,
  ],
  imports: [CommonModule, NgOptimizedImage, FontAwesomeModule],
  exports: [HomeComponent],
})
export class HomeModule {}
