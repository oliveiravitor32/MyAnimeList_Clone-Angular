import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IMangasResponseData } from '../../interfaces/mangas-reponse/mangas-response-data.interface';

@Component({
  selector: 'app-manga-list-item',
  templateUrl: './manga-list-item.component.html',
  styleUrl: './manga-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MangaListItemComponent {
  @Input({ required: true }) manga!: IMangasResponseData;
}
