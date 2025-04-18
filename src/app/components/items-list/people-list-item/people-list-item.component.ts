import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPeoplesResponseData } from '../../../interfaces/peoples-response/peoples-response-data.interface';

@Component({
  selector: 'app-people-list-item',
  templateUrl: './people-list-item.component.html',
  styleUrl: './people-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleListItemComponent {
  onItemSelected() {
    throw new Error('Method not implemented.');
  }
  @Input({ required: true }) item!: IPeoplesResponseData;

  readonly defaultImageUrl = '/assets/icons/question-icon.png';
}
