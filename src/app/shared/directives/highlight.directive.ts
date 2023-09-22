import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = '#4269f5';
    this.element.nativeElement.style.color = '#ffffff';
  }

  @HostListener('mousleave') onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = '';
  }

  constructor(
    private element: ElementRef
  ) {
    this.element.nativeElement.style.backgroundColor = '#4269f5';
    this.element.nativeElement.style.color = '#ffffff';
  }

}
