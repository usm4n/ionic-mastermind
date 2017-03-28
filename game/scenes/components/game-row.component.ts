import { Component, Input } from '@angular/core';

@Component({
    selector: 'game-row',
    templateUrl: 'game-row.html'
})
export class GameRowComponent {
    @Input() currentColor: string;
    @Input() currentRow: number;
    @Input() activeRow: string;
}
