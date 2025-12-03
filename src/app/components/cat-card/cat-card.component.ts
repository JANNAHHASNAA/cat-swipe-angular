import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.css']
})
export class CatCardComponent {
  @Input() img!: string;
  @Input() zIndex = 0;
  @Input() isTop = false;
  @Output() like = new EventEmitter<void>();
  @Output() dislike = new EventEmitter<void>();

  x = 0;
 startX = 0;
dragging = false;
  flying = false;
  public threshold = 100; // changed to public

  @HostListener('pointerdown', ['$event']) down(e: PointerEvent) {
    if (!this.isTop || this.flying) return;
    this.dragging = true;
    this.startX = e.clientX - this.x;
  }

  @HostListener('pointermove', ['$event']) move(e: PointerEvent) {
    if (!this.dragging) return;
    this.x = e.clientX - this.startX;
  }

  @HostListener('pointerup') up() {
    if (!this.dragging) return;
    this.dragging = false;

    if (this.x > this.threshold) this.fly('right');
    else if (this.x < -this.threshold) this.fly('left');
    else this.reset();
  }

  fly(dir: 'left' | 'right') {
    if (this.flying) return;
    this.flying = true;
    this.x += dir === 'right' ? 1000 : -1000;
    setTimeout(() => {
      dir === 'right' ? this.like.emit() : this.dislike.emit();
      this.reset();
      this.flying = false;
    }, 40);
  }

  private reset() { this.x = 0; }

  get transform() { return `translateX(${this.x}px) rotate(${this.x/20}deg)`; }
  get transition() { return this.dragging ? 'none' : 'transform 0.3s ease'; }
}
