import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICharactersResponseData } from '../../interfaces/characters-response/characters-response-data.interface';

@Component({
  selector: 'app-character-list-item',
  templateUrl: './character-list-item.component.html',
  styleUrl: './character-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListItemComponent {
  @Input({ required: true }) character!: ICharactersResponseData;

  // Default image to use when character image is missing
  defaultImageUrl = 'assets/icons/question-icon.svg';

  get imageUrl(): string {
    return (
      this.character?.images?.webp?.image_url ||
      this.character?.images?.jpg?.image_url ||
      this.defaultImageUrl
    );
  }

  get characterName(): string {
    return (
      this.character?.name || this.character.nicknames[0] || 'Unknown Character'
    );
  }

  onItemSelected() {
    // TODO
  }
}
