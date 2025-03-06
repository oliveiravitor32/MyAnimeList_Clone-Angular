import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IMangasResponseData } from '../../interfaces/mangas-reponse/mangas-response-data.interface';

@Component({
  selector: 'app-manga-list-item',
  templateUrl: './manga-list-item.component.html',
  styleUrl: './manga-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MangaListItemComponent {
  @Input({ required: true }) manga!: IMangasResponseData;

  // Default image to use when manga image is missing
  defaultImageUrl = 'assets/icons/question-icon.svg';

  get imageUrl(): string {
    return (
      this.manga?.images?.webp?.image_url ||
      this.manga?.images?.jpg?.image_url ||
      this.defaultImageUrl
    );
  }

  get mangaTitle(): string {
    return this.manga?.title || 'Unknown Manga';
  }

  get mangaType(): string {
    return this.manga?.type || 'N/A';
  }

  onItemSelected() {
    // TODO
  }
}
