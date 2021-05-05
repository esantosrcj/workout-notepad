import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[appAccordion]'
})
export class AccordionDirective {
    @HostListener('click', ['$event.target']) accordionToggle(event: Event) {
        let panel: HTMLDivElement = this.elRef.nativeElement.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }
    
    constructor(private elRef: ElementRef) {}

}