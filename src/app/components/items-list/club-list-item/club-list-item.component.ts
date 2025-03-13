import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IClubsResponseData } from '../../../interfaces/clubs-response/clubs-response-data.interface';

@Component({
  selector: 'app-club-list-item',
  templateUrl: './club-list-item.component.html',
  styleUrl: './club-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubListItemComponent {
  @Input({ required: true }) item!: IClubsResponseData;

  readonly defaultImageUrl = '/assets/icons/question-icon.png';

  onItemSelected() {
    throw new Error('Method not implemented.');
  }
}
