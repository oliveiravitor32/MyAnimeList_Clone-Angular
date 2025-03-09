import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAllResponseData } from '../../../types/all-response-data';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  @Input({ required: true }) item!: IAllResponseData;

  onItemSelected() {
    // TODO
  }
}
