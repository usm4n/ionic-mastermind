import { Directive,
    HostBinding,
    HostListener,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    Renderer
} from '@angular/core';

@Directive({
    selector: '[colorSlot]' // Attribute selector
})
export class ColorSlotDirective {
    @Input() currentColor: string;
    @Output() slotChanged = new EventEmitter<boolean>();
    @HostBinding('class.slot') slot = true;

    private oldColor: string;
    constructor(private renderer: Renderer, private el: ElementRef) {
        console.log('Hello SlotDirective Directive');
    }

    @HostListener('click') changeSlotColor() {
        if (this.currentColor === this.oldColor) {return;}

        this.addNewClass();
        this.removeOldClass();

        this.slotChanged.emit(true);

        this.oldColor = this.currentColor;
    }

    removeOldClass() {
        this.renderer.setElementClass(
            this.el.nativeElement, this.oldColor, false
        );
    }

    addNewClass() {
        this.renderer.setElementClass(
            this.el.nativeElement, this.currentColor, true
        )
    }
}
