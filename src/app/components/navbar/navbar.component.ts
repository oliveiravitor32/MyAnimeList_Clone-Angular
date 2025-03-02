import { LinkGroupsList } from './../../types/link-groups';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  searchText: string = '';

  searchIcon = faMagnifyingGlass;
  closeIcon = faTimes;

  searchForm = new FormGroup({
    category: new FormControl('All'),
    text: new FormControl('', Validators.required),
  });

  get isInputEmpty(): boolean {
    return this.searchText.trim().length === 0;
  }

  LinkGroupsList: LinkGroupsList = [
    {
      title: 'Anime',
      linksList: [
        { title: 'Anime Search', path: '' },
        { title: 'Top Anime', path: '' },
        { title: 'Seasonal Anime', path: '' },
        { title: 'Videos', path: '' },
        { title: 'Reviews', path: '' },
        { title: 'Recommendations', path: '' },
        { title: '2024 Challenge', path: '' },
        { title: 'Fantasy Anime League', path: '' },
      ],
    },
    {
      title: 'Manga',
      linksList: [
        { title: 'Manga Search', path: '' },
        { title: 'Top Manga', path: '' },
        { title: 'Adapted to Anime', path: '' },
        { title: 'Manga Store', path: '' },
        { title: 'Reviews', path: '' },
        { title: 'Recommendations', path: '' },
        { title: '2024 Challenge', path: '' },
      ],
    },
    {
      title: 'Community',
      linksList: [
        { title: 'Interest Stacks', path: '' },
        { title: 'Forums', path: '' },
        { title: 'Clubs', path: '' },
        { title: 'Blogs', path: '' },
        { title: 'Users', path: '' },
      ],
    },
    {
      title: 'Industry',
      linksList: [
        { title: 'News', path: '' },
        { title: 'Featured Articles', path: '' },
        { title: 'People', path: '' },
        { title: 'Characters', path: '' },
        { title: 'Companies', path: '' },
        { title: 'MAL x Japan', path: '' },
      ],
    },
    {
      title: 'Watch',
      linksList: [
        { title: 'Episode Videos', path: '' },
        { title: 'Anime Trailers', path: '' },
      ],
    },
    {
      title: 'Read',
      linksList: [{ title: 'Manga Store', path: '' }],
    },
    {
      title: 'Help',
      linksList: [
        { title: 'About', path: '' },
        { title: 'Support', path: '' },
        { title: 'Advertising', path: '' },
        { title: 'Faq', path: '' },
        { title: 'Report', path: '' },
        { title: 'Staff', path: '' },
        { title: 'MAL Supporter', path: '' },
      ],
    },
  ];

  clearSearch() {
    this.searchText = '';
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }
}
