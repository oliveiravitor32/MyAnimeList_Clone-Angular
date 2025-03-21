// media-carousel.component.ts
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { AnimesResponseDataList } from '../../../types/animes-response-data-list';

@Component({
  selector: 'app-media-carousel',
  templateUrl: './media-carousel.component.html',
  styleUrls: ['./media-carousel.component.css'],
})
export class MediaCarouselComponent implements AfterViewInit, OnDestroy {
  @HostListener('window:resize')
  onResize(): void {
    this.resizeSubject.next();
  }

  @Input({ required: true }) title: string = 'N/A';
  @Input({ required: true }) viewAllLink: string = '#';
  @Input({ required: true }) items: AnimesResponseDataList = [];
  @Input({ required: true }) size: string = 'default';

  private sizes: { [key: string]: { width: string; height: string } } = {
    default: {
      width: '160px',
      height: '220px',
    },
    small: {
      width: '108px',
      height: '163px',
    },
    wide: {
      width: '220px',
      height: '120px',
    },
  };

  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLDivElement>;

  private readonly ANIMATION_DURATION = 500;
  private animationTimeout?: ReturnType<typeof setTimeout>;

  private readonly resizeDebounceTime = 200; // milliseconds
  private resizeSubject = new Subject<void>();
  private resizeSubscription = new Subscription();

  private itemsMovedPerSlide: number = 3;
  private slideWidth: number = 0;
  private isAnimating: boolean = false;
  itemsToShow: number = 4;

  constructor() {
    this.resizeSubscription = this.resizeSubject
      .pipe(debounceTime(this.resizeDebounceTime))
      .subscribe(() => {
        this.calculateDimensions();
      });
  }

  get width(): string {
    return this.sizes[this.size].width || this.sizes['default'].width;
  }

  get height(): string {
    return this.sizes[this.size].height || this.sizes['default'].height;
  }

  // Get empty array to fill the space when is loading
  get emptyArray(): any[] {
    return Array.from({ length: this.itemsToShow + 1 });
  }

  ngAfterViewInit(): void {
    this.calculateDimensions();
  }

  // load items with @defer based on index
  shouldLoadItem(index: number) {
    if (this.items.length < this.itemsToShow) return true;

    // Only load items that are within the current view or will appear on the next slide
    return index <= this.itemsToShow + this.itemsMovedPerSlide;
  }

  calculateDimensions(): void {
    if (!this.carouselTrack?.nativeElement) return;

    const track = this.carouselTrack.nativeElement;

    // Adjust slides based on viewport
    if (window.innerWidth < 768) {
      this.itemsToShow = 4;
    } else {
      this.itemsToShow = 4;
    }

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
      this.itemsMovedPerSlide * this.slideWidth
    }px)`;

    // 2. After animation completes, move items and reset position
    this.animationTimeout = setTimeout(() => {
      // Temporarily disable transitions
      track.style.transition = 'none';

      // Move items from beginning to end for infinite effect
      const itemsToMove = this.items.splice(0, this.itemsMovedPerSlide);
      this.items.push(...itemsToMove);

      // Reset position
      track.style.transform = 'translateX(0)';

      // Force layout recalculation
      void track.offsetWidth;

      // Re-enable transitions
      track.style.transition = 'transform 500ms ease-out';

      this.isAnimating = false;
    }, this.ANIMATION_DURATION);
  }

  prev(): void {
    if (this.isAnimating || !this.items.length) return;
    this.isAnimating = true;

    const track = this.carouselTrack.nativeElement;

    // First move items without animation
    track.style.transition = 'none';

    // Move items from end to beginning
    const itemsToMove = this.items.splice(-this.itemsMovedPerSlide);
    this.items.unshift(...itemsToMove);

    // Set initial position before animation
    track.style.transform = `translateX(-${
      this.itemsMovedPerSlide * this.slideWidth
    }px)`;

    // Force reflow
    void track.offsetWidth;

    // Animate to normal position
    track.style.transition = 'transform 500ms ease-out';
    track.style.transform = 'translateX(0)';

    this.animationTimeout = setTimeout(() => {
      this.isAnimating = false;
    }, this.ANIMATION_DURATION);
  }

  trackById(index: number, item: any): number {
    return item?.mal_id || index;
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
    this.resizeSubject.complete();
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }
}
