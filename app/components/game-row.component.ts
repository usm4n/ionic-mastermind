import {
    Component,
    Input,
    ViewChildren,
    QueryList
} from '@angular/core';
import { SequenceMatcherService } from '../services/sequence-matcher.service';
import { ColorSlotDirective } from './directives/color-slot.directive';

@Component({
    selector: 'game-row',
    templateUrl: 'game-row.html'
})
export class GameRowComponent {
    @Input() currentColor: string;
    @Input() currentRow: number;
    @Input() activeRow: string;
    @ViewChildren(ColorSlotDirective) private children: QueryList<ColorSlotDirective>;

    private _colorSequence : ColorSlotDirective[];

    activateResultColumn: boolean = false;

    constructor(private sequenceMatcher: SequenceMatcherService){}

    updateRow() {
        this._colorSequence = this.children
            .filter(item => item.color.length > 0);
        this.activateResultColumn = this._colorSequence.length === 4;
    }

    checkUserColorSequence() {
        let colorSequence = this.colorSequence;
        
        let matched = this.sequenceMatcher.matchSequence(colorSequence);
        console.log(matched);
    }

    get colorSequence() {
        return this._colorSequence.map(item => item.color);
    }
}

