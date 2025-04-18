import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AnimeLeaderboardComponent } from './anime-leaderboard/anime-leaderboard.component';
import { HomeComponent } from './home.component';
import { AnimeCardComponent } from './media-carousel/anime-card/anime-card.component';
import { EpisodeCardComponent } from './media-carousel/episode-card/episode-card.component';
import { MediaCarouselComponent } from './media-carousel/media-carousel.component';
import { TrailerCardComponent } from './media-carousel/trailer-card/trailer-card.component';
import { PostShowcaseComponent } from './post-showcase/post-showcase.component';

@NgModule({
  declarations: [
    HomeComponent,
    PostShowcaseComponent,
    AnimeLeaderboardComponent,
    MediaCarouselComponent,
    AnimeCardComponent,
    EpisodeCardComponent,
    TrailerCardComponent,
  ],
  imports: [CommonModule, NgOptimizedImage, FontAwesomeModule],
  exports: [HomeComponent],
})
export class HomeModule {}
