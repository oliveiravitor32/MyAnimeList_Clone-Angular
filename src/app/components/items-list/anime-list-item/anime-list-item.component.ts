import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAnimesResponseData } from '../../../interfaces/animes-response/animes-response-data.interface';

@Component({
  selector: 'app-anime-list-item',
  templateUrl: './anime-list-item.component.html',
  styleUrl: './anime-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeListItemComponent {
  @Input({ required: true }) item!: IAnimesResponseData;

  readonly defaultImageUrl = '/assets/icons/question-icon.png';

  onItemSelected() {
    throw new Error('Method not implemented.');
  }
}
