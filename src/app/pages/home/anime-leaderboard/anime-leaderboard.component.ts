import { Component, Input } from '@angular/core';
import { AnimesResponseDataList } from '../../../types/api-response-data-lists/animes-response-data-list';

@Component({
  selector: 'app-anime-leaderboard',
  templateUrl: './anime-leaderboard.component.html',
  styleUrl: './anime-leaderboard.component.css',
})
export class AnimeLeaderboardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) dataList!: AnimesResponseDataList;

  readonly defaultImageUrl = '/assets/icons/question-icon.png';

  // Get empty array to fill the space when is loading
  get emptyArray(): any[] {
    return Array.from({ length: 5 });
  }
}
