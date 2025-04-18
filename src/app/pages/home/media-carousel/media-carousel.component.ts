// media-carousel.component.ts
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { debounceTime, Subject, Subscription } from 'rxjs';

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
  @Input({ required: true }) viewMoreLink: string = '#';
  @Input({ required: true }) items: any = [];
  @Input({ required: true }) itemType: string = 'default';

  @Input({ required: true }) cardTemplate!: TemplateRef<any>;

  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLDivElement>;

  private readonly ANIMATION_DURATION = 500; // milliseconds
  private animationTimeout?: ReturnType<typeof setTimeout>;

  private readonly resizeDebounceTime = 200; // milliseconds
  private resizeSubject = new Subject<void>();
  private resizeSubscription = new Subscription();

  private itemsMovedPerSlide: number = 3;
  private slideWidth: number = 0;
  private isAnimating: boolean = false;
  itemsToShow: number = 4;

  // empty array to fill the space when is loading
  emptyArray: number[] = Array.from({ length: 6 });

  leftArrowIcon = faChevronLeft;
  rightArrowIcon = faChevronRight;

  constructor() {
    this.resizeSubscription = this.resizeSubject
      .pipe(debounceTime(this.resizeDebounceTime))
      .subscribe(() => {
        this.calculateDimensions();
      });
  }

  ngAfterViewInit(): void {
    this.calculateDimensions();
  }

  // load items with @defer based on index
  shouldLoadItem(index: number) {
    if (this.items.length < this.itemsToShow) return true;

    // Only load items that are within the current view or will appear on the next slide action
    return (
      index <= this.itemsToShow + this.itemsMovedPerSlide ||
      index >= this.items.length - this.itemsMovedPerSlide
    );
  }

  calculateDimensions(): void {
    if (!this.carouselTrack?.nativeElement) return;

    const trackEl = this.carouselTrack.nativeElement;

    // Calculate slide width based on first item
    if (trackEl.children[0]) {
      this.slideWidth = trackEl.children[0].clientWidth + 8; // width + gap;
    }

    // Set max items to show based on track width
    this.itemsToShow = Math.floor(trackEl.clientWidth / this.slideWidth);
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
