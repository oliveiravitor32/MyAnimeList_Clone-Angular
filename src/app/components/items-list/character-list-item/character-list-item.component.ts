import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICharactersResponseData } from '../../../interfaces/characters-response/characters-response-data.interface';

@Component({
  selector: 'app-character-list-item',
  templateUrl: './character-list-item.component.html',
  styleUrl: './character-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListItemComponent {
  @Input({ required: true }) item!: ICharactersResponseData;

  readonly defaultImageUrl = '/assets/icons/question-icon.png';

  onItemSelected() {
    throw new Error('Method not implemented.');
  }
}
