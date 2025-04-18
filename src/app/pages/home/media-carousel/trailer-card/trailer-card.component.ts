import { Component, Input } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { IAnimesResponseData } from '../../../../interfaces/animes-response/animes-response-data.interface';

@Component({
  selector: 'app-trailer-card',
  templateUrl: './trailer-card.component.html',
  styleUrl: './trailer-card.component.css',
})
export class TrailerCardComponent {
  @Input() item?: IAnimesResponseData;
  @Input({ required: true }) tabindex: number = -1;

  playIcon = faPlay;
}
