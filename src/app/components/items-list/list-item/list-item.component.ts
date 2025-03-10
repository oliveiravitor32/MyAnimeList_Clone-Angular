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
  isClubs = false;

  titleOrName: string = '';
  nicknames: string[] = [];
  imageUrl: string = '';
  typeOrCategory: string = '';
  releaseYear: string = '';
  birthday: string = '';
  formattedFullDate: string = '';
  members_count: string = '';
  score: string = '';
  favorites: string = '';
  status: string = '';

  ngOnInit(): void {
    // Compute values once per component instance
    this.titleOrName = this.getPipeValue(this.item, 'itemTitleOrName');
    this.imageUrl = this.getPipeValue(this.item, 'itemImage');

    this.isAnimeOrManga = this.checkItemType(['anime', 'manga']);
    if (this.isAnimeOrManga) {
      this.typeOrCategory = this.getPipeValue(this.item, 'itemTypeOrCategory');
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

    console.log('out');
    this.isClubs = this.checkItemType(['club']);
    if (this.isClubs) {
      console.log('inside');
      this.members_count = this.getPipeValue(this.item, 'itemMembers');
      this.typeOrCategory = this.getPipeValue(this.item, 'itemTypeOrCategory');
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
