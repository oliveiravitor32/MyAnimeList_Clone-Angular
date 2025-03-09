import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItemFavoritesPipe } from '../../pipes/item/item-favorites.pipe';
import { ItemFormatDatePipe } from '../../pipes/item/item-format-date.pipe';
import { ItemImagePipe } from '../../pipes/item/item-image.pipe';
import { ItemIsOneOfPipe } from '../../pipes/item/item-is-one-of.pipe';
import { ItemNicknamesPipe } from '../../pipes/item/item-nicknames.pipe';
import { ItemReleaseYearPipe } from '../../pipes/item/item-release-year.pipe';
import { ItemScorePipe } from '../../pipes/item/item-score.pipe';
import { ItemStatusPipe } from '../../pipes/item/item-status.pipe';
import { ItemTitlePipe } from '../../pipes/item/item-title.pipe';
import { ItemTypePipe } from '../../pipes/item/item-type.pipe';

@NgModule({
  declarations: [
    ItemImagePipe,
    ItemTitlePipe,
    ItemTypePipe,
    ItemReleaseYearPipe,
    ItemFormatDatePipe,
    ItemScorePipe,
    ItemStatusPipe,
    ItemFavoritesPipe,
    ItemIsOneOfPipe,
    ItemNicknamesPipe,
  ],
  imports: [CommonModule],
  exports: [
    ItemImagePipe,
    ItemTitlePipe,
    ItemTypePipe,
    ItemReleaseYearPipe,
    ItemFormatDatePipe,
    ItemScorePipe,
    ItemStatusPipe,
    ItemFavoritesPipe,
    ItemIsOneOfPipe,
    ItemNicknamesPipe,
  ],
})
export class SharedPipesModule {}
