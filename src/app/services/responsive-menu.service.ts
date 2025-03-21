import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, OnDestroy, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveMenuService implements OnDestroy {
  private document = inject(DOCUMENT);
  private mediaQuery: MediaQueryList;

  // Readable and writable signals
  readonly isDropdownLinksOpen = signal(true);
  readonly isSearchBarOpen = signal(true);
  readonly isDesktopView = signal(true);

  // Computed signals to check if any menu is open
  readonly isAnyMenuOpen = computed(
    () => this.isDropdownLinksOpen() || this.isSearchBarOpen()
  );

  constructor() {
    // Initialize with current screen size
    this.mediaQuery =
      this.document.defaultView?.matchMedia('(min-width: 768px)') ||
      ({ matches: true } as MediaQueryList);

    // Set initial value
    this.isDesktopView.set(this.mediaQuery.matches);

    // Start the site with all menus closed on mobile
    if (!this.isDesktopView()) {
      this.isDropdownLinksOpen.set(false);
      this.isSearchBarOpen.set(false);
    }

    // Add event listener for screen size changes
    this.mediaQuery.addEventListener('change', this.handleMediaChange);
  }

  private handleMediaChange = (event: MediaQueryListEvent): void => {
    // Update desktop view signal when screen size changes
    this.isDesktopView.set(event.matches);
    // Force unlock body scroll when switching to desktop view
    this.updateBodyScrollState();

    // Auto-close menus when switching to mobile view
    if (!event.matches) {
      this.closeAllMenus();
    }
  };

  toggleDropdownLinks(): void {
    const currentValue = this.isDropdownLinksOpen();

    // Close other menu if opening this one
    if (!currentValue) {
      this.isSearchBarOpen.set(false);
    }

    this.isDropdownLinksOpen.set(!currentValue);
    this.updateBodyScrollState();
  }

  toggleSearchBar(): void {
    const currentValue = this.isSearchBarOpen();

    // Close other menu if opening this one
    if (!currentValue) {
      this.isDropdownLinksOpen.set(false);
    }

    this.isSearchBarOpen.set(!currentValue);
    this.updateBodyScrollState();
  }

  closeAllMenus(): void {
    this.isDropdownLinksOpen.set(false);
    this.isSearchBarOpen.set(false);
    this.updateBodyScrollState();
  }

  updateBodyScrollState(): void {
    if (this.isAnyMenuOpen() && !this.isDesktopView()) {
      // lock body scroll
      this.document.body.classList.add('overflow-hidden');
    }
    // unlock body scroll
    this.document.body.classList.remove('overflow-hidden');
  }

  ngOnDestroy(): void {
    // Cleanup event listener
    this.mediaQuery.removeEventListener('change', this.handleMediaChange);
  }
}
