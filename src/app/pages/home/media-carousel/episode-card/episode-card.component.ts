import { Component, Input } from '@angular/core';
import { IEpisodesResponseData } from '../../../../interfaces/episodes-response/episodes-response-data.interface';

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.css',
})
export class EpisodeCardComponent {
  @Input() item?: IEpisodesResponseData;
  @Input({ required: true }) tabindex: number = -1;
}
