import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAllResponseData } from '../../types/all-response-data';
import { AllResponseDataList } from '../../types/all-response-data-list';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsListComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) itemsDataList: AllResponseDataList = [];

  /**
   * Custom trackBy function to optimize rendering performance
   * @param index - The index of the current item
   * @param item - The item in the array
   * @returns A unique identifier for the item
   */
  trackByItem(index: number, item: IAllResponseData): any {
    // Try mal_id first (most data types)
    if (item && 'mal_id' in item) {
      return item.mal_id;
    }

    // For user types
    if (item && 'username' in item) {
      return item.username;
    }

    // Fallback to index if no unique identifier exists
    return index;
  }
}
