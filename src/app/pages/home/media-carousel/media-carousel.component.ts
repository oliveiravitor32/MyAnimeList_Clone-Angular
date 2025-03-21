// media-carousel.component.ts
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AnimesResponseDataList } from '../../../types/animes-response-data-list';

@Component({
  selector: 'app-media-carousel',
  templateUrl: './media-carousel.component.html',
  styleUrls: ['./media-carousel.component.css'],
})
export class MediaCarouselComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
  @Input() title = 'Trending Now';
  @Input() viewAllLink = '#';
  @Input() items: AnimesResponseDataList = [];
  @Input() itemsToShow = 6;

  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLDivElement>;

  private animationTimeout?: ReturnType<typeof setTimeout>;

  itemsPerSlideMovement = 3; // maybe input for a future implementation
  currentIndex = 0;
  totalSlides = 0;
  slideWidth = 0;
  isAnimating = false;

  ngAfterViewInit(): void {
    this.calculateDimensions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && !changes['items'].firstChange) {
      setTimeout(() => this.calculateDimensions(), 0);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.calculateDimensions();
  }

  // load items with @defer based on index
  shouldLoadItem(index: number) {
    if (this.items.length < this.itemsToShow) return true;

    // Only load items that are within the current view or will appear on the next slide
    return index <= this.itemsToShow + this.itemsPerSlideMovement;
  }

  calculateDimensions(): void {
    if (!this.carouselTrack?.nativeElement) return;

    const track = this.carouselTrack.nativeElement;
    const itemCount = track.children.length;

    // Adjust slides based on viewport
    if (window.innerWidth < 768) {
      this.itemsToShow = 3;
    } else {
      this.itemsToShow = 6;
    }

    this.totalSlides = Math.max(0, itemCount - this.itemsToShow);

    // Calculate slide width based on first item
    if (track.children[0]) {
      this.slideWidth = track.children[0].clientWidth + 8; // width + gap
    }
  }

  next(): void {
    if (this.isAnimating || !this.items.length) return;
    this.isAnimating = true;

    // Get track element
    const track = this.carouselTrack.nativeElement;

    // 1. Animate the movement
    track.style.transition = 'transform 500ms ease-out';
    track.style.transform = `translateX(-${
      this.itemsPerSlideMovement * this.slideWidth
    }px)`;

    // 2. After animation completes, move items and reset position
    this.animationTimeout = setTimeout(() => {
      // Temporarily disable transitions
      track.style.transition = 'none';

      // Move items from beginning to end for infinite effect
      const itemsToMove = this.items.splice(0, this.itemsPerSlideMovement);
      this.items.push(...itemsToMove);

      // Reset position
      track.style.transform = 'translateX(0)';

      // Force layout recalculation
      void track.offsetWidth;

      // Re-enable transitions
      track.style.transition = 'transform 500ms ease-out';

      this.isAnimating = false;
    }, 500);
  }

  prev(): void {
    if (this.isAnimating || !this.items.length) return;
    this.isAnimating = true;

    const track = this.carouselTrack.nativeElement;

    // First move items without animation
    track.style.transition = 'none';

    // Move items from end to beginning
    const itemsToMove = this.items.splice(-this.itemsPerSlideMovement);
    this.items.unshift(...itemsToMove);

    // Set initial position before animation
    track.style.transform = `translateX(-${
      this.itemsPerSlideMovement * this.slideWidth
    }px)`;

    // Force reflow
    void track.offsetWidth;

    // Animate to normal position
    track.style.transition = 'transform 500ms ease-out';
    track.style.transform = 'translateX(0)';

    this.animationTimeout = setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  trackById(index: number, item: any): number {
    return item?.mal_id || index;
  }

  ngOnDestroy(): void {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }
}
