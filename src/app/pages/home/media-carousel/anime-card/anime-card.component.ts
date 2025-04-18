import { Component, Input } from '@angular/core';
import { IAnimesResponseData } from '../../../../interfaces/animes-response/animes-response-data.interface';

@Component({
  selector: 'app-anime-card',
  templateUrl: './anime-card.component.html',
  styleUrl: './anime-card.component.css',
})
export class AnimeCardComponent {
  @Input() item?: IAnimesResponseData;
  @Input({ required: true }) tabindex: number = -1;
}
