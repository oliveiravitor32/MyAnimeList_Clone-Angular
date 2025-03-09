import { Pipe, PipeTransform } from '@angular/core';
import { IAllResponseData } from '../../types/all-response-data';

@Pipe({
  name: 'itemImage',
})
export class ItemImagePipe implements PipeTransform {
  transform(item: IAllResponseData): string {
    // Default image to use when anime image is missing
    const defaultImageUrl = 'assets/icons/question-icon.svg';

    // Check if item has webp image, if not use jpg image
    if ('webp' in item.images) {
      return item.images.webp.image_url;
    }
    return item?.images?.jpg?.image_url || defaultImageUrl;
  }
}
