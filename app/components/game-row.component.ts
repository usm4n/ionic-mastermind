import { Component, Input } from '@angular/core';
import { SequenceMatcherService } from '../services/sequence-matcher.service';

@Component({
    selector: 'game-row',
    templateUrl: 'game-row.html'
})
export class GameRowComponent {
    @Input() currentColor: string;
    @Input() currentRow: number;
    @Input() activeRow: string;

    constructor(private sequenceMatcher: SequenceMatcherService){}
}
