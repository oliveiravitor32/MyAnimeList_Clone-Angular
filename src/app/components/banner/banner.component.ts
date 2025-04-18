import { Component } from '@angular/core';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
})
export class BannerComponent {
  get bannerAlt() {
    return 'Start tracking your anime today.';
  }

  googleIcon = faGoogle;
}
