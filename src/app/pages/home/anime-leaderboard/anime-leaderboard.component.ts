import { Component, Input } from '@angular/core';
import { AnimesResponseDataList } from '../../../types/animes-response-data-list';

@Component({
  selector: 'app-anime-leaderboard',
  templateUrl: './anime-leaderboard.component.html',
  styleUrl: './anime-leaderboard.component.css',
})
export class AnimeLeaderboardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) dataList!: AnimesResponseDataList;

  readonly defaultImageUrl = '/assets/icons/question-icon.png';
}
