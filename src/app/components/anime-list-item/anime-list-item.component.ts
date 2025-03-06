import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAnimesResponseData } from '../../interfaces/animes-response/animes-response-data.interface';

@Component({
  selector: 'app-anime-list-item',
  templateUrl: './anime-list-item.component.html',
  styleUrl: './anime-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeListItemComponent {
  @Input({ required: true }) anime!: IAnimesResponseData;

  // Default image to use when anime image is missing
  defaultImageUrl = 'assets/icons/question-icon.svg';

  get imageUrl(): string {
    return (
      this.anime?.images?.webp?.image_url ||
      this.anime?.images?.jpg?.image_url ||
      this.defaultImageUrl
    );
  }

  get animeTitle(): string {
    return this.anime?.title || 'Unknown Anime';
  }

  get animeType(): string {
    return this.anime?.type || 'N/A';
  }

  get animeReleaseYear(): string {
    return this.anime?.aired?.prop?.from?.year.toString() || 'N/A';
  }

  onItemSelected() {
    // TODO
  }
}
