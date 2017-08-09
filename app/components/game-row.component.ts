import {
    Component,
    Input,
    Output,
    EventEmitter,
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
    @Input() activeRow: number;
    @Input() resetRow: boolean;

    @Output() rowMatched: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() resetRowChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChildren(ColorSlotDirective) private children: QueryList<ColorSlotDirective>;

    private _colorSequence: ColorSlotDirective[];

    match: string[] = ['nomatch', 'nomatch', 'nomatch', 'nomatch'];
    activateResultColumn: boolean = false;

    constructor(private sequenceMatcher: SequenceMatcherService) {
        //
    }

    ngOnInit() {
        //
    }

    ngOnChanges() {
        if(this.resetRow) {
            this.resetRowData();
            if(this.currentRow === this.activeRow) {
                //wait for this tick to end
                setTimeout(_ => this.resetRowChange.emit(false));
            }
        }
    }

    updateRow() {
        this._colorSequence = this.children
            .filter(item => item.color.length > 0);
        this.activateResultColumn = this._colorSequence.length === 4;
    }

    checkUserColorSequence() {
        if (this.currentRow !== this.activeRow ||
            this.activateResultColumn === false) return;

        this.match = this.sequenceMatcher.matchSequence(this.colorSequence);
        console.log(this.match);
        this.rowMatched.emit(this.reduceMatch(this.match));
    }

    reduceMatch(matchedSeq: string[]): boolean {
        return matchedSeq.reduce((acc, value) => acc && (value === 'exists'), true);
    }

    resetRowData() {
        this.match = this.match.map(v => 'nomatch');
        this.children.forEach(c => c.resetDirective());
        this.updateRow();
    }

    get colorSequence() {
        return this._colorSequence.map(item => item.color);
    }
}

