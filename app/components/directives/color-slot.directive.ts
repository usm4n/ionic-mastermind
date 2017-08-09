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
    @Input() inactive: boolean;
    @Input() currentColor: string;
    @Output() slotChanged = new EventEmitter<boolean>();
    @HostBinding('class.slot') slot = true;

    private oldColor: string;
    private _color : string;
    constructor(private renderer: Renderer, private el: ElementRef) {
        console.log('Hello SlotDirective Directive');
    }

    @HostListener('click') changeSlotColor() {
        if (this.currentColor === this.oldColor || this.inactive === true) {return;}

        this.addNewClass();
        this.removeOldClass();

        this._color = this.currentColor;

        this.slotChanged.emit(true);

        this.oldColor = this.currentColor;
    }

    removeOldClass() {
        if (this.oldColor) {
            this.renderer.setElementClass(
                this.el.nativeElement, this.oldColor, false
            );
        }
    }

    addNewClass() {
        this.renderer.setElementClass(
            this.el.nativeElement, this.currentColor, true
        )
    }

    resetDirective() {
        this._color = '';
        this.removeOldClass();
        this.oldColor = '';
    }

    get color() {
        return this._color || '';
    }
}
