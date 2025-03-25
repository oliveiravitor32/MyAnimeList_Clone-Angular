import { Component, Input } from '@angular/core';
import { IAnimesResponseData } from '../../../interfaces/animes-response/animes-response-data.interface';
import { ICharactersResponseData } from '../../../interfaces/characters-response/characters-response-data.interface';
import { AnimesResponseDataList } from '../../../types/animes-response-data-list';
import { CharactersResponseDataList } from './../../../types/characters-response-data-list';

@Component({
  selector: 'app-top-links-ranking',
  templateUrl: './top-links-ranking.component.html',
  styleUrl: './top-links-ranking.component.css',
})
export class TopLinksRankingComponent {
  @Input({ required: true }) title: string = 'Unknown';
  @Input({ required: true }) items:
    | AnimesResponseDataList
    | CharactersResponseDataList = [];

  titleOrName(item: IAnimesResponseData | ICharactersResponseData) {
    if ('title' in item) {
      return item.title_english || item.title || 'Unknown';
    }

    return item.name || 'Unknown';
  }
}
