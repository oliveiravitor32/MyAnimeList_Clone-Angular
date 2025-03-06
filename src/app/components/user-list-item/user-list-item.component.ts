import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IUsersResponseData } from '../../interfaces/users-response/users-response-data.interface';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrl: './user-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListItemComponent {
  @Input({ required: true }) user!: IUsersResponseData;
}
