import { Component } from '@angular/core';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-social-media-links',
  templateUrl: './social-media-links.component.html',
  styleUrl: './social-media-links.component.css',
})
export class SocialMediaLinksComponent {
  linkedinIcon = faLinkedin;
  githubIcon = faGithubSquare;
}
