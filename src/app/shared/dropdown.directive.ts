import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @HostBinding('class.open') dropdownOpen: boolean = false;

  constructor(private elementRef: ElementRef) { } //, private renderer: Renderer2

  ngOnInit(): void {
    // this.dropdownOpen = false;
    // if (this.elementRef.nativeElement.className.contains('open')) {
    //   this.dropdownOpen = true;
    // } else {
    //   this.dropdownOpen = false;
    // }
  }

  @HostListener('document:click', [ '$event' ]) toggleDropdownClass(event: Event) {
    // if (!this.dropdownOpen) {
    //   this.renderer.addClass(this.elementRef.nativeElement, 'open')
    // } else {
    //   this.renderer.removeClass(this.elementRef.nativeElement, 'open');
    // }
    this.dropdownOpen = this.elementRef.nativeElement.contains(event.target) ? !this.dropdownOpen : false;
  }
}