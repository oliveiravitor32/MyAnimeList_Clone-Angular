import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IAllResponseData } from '../../../types/all-response-data';
import { typeChecksMap } from '../../../utils/type-checks-map';
import { ListItemController } from './list-item-controller';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent extends ListItemController implements OnInit {
  @Input({ required: true }) item!: IAllResponseData;

  isAnimeOrManga = false;
  isCharacter = false;
  isPeople = false;

  title: string = '';
  nicknames: string[] = [];
  imageUrl: string = '';
  type: string = '';
  releaseYear: string = '';
  birthday: string = '';
  formattedFullDate: string = '';
  score: string = '';
  favorites: string = '';
  status: string = '';

  ngOnInit(): void {
    // Compute values once per component instance
    this.title = this.getPipeValue(this.item, 'itemTitle');
    this.imageUrl = this.getPipeValue(this.item, 'itemImage');

    this.isAnimeOrManga = this.checkItemType(['anime', 'manga']);
    if (this.isAnimeOrManga) {
      this.type = this.getPipeValue(this.item, 'itemType');
      this.releaseYear = this.getPipeValue(this.item, 'itemReleaseYear');
      this.formattedFullDate = this.getPipeValue(this.item, 'itemFormatDate');
      this.status = this.getPipeValue(this.item, 'itemStatus');
      this.score = this.getPipeValue(this.item, 'itemScore');
      return;
    }

    this.isCharacter = this.checkItemType(['character']);
    if (this.isCharacter) {
      this.nicknames = this.getPipeValue(this.item, 'itemNicknames');
      return;
    }

    this.isPeople = this.checkItemType(['people']);
    if (this.isPeople) {
      this.favorites = this.getPipeValue(this.item, 'itemFavorites');
      this.birthday = this.getPipeValue(this.item, 'itemBirthday');
    }
  }

  private checkItemType(types: string[]): boolean {
    return types.some(
      (type) => typeChecksMap[type] && typeChecksMap[type](this.item)
    );
  }

  onItemSelected() {
    // TODO
  }
}
