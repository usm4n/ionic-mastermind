import {
    Component,
    OnInit,
    Input,
} from '@angular/core';
import {
    trigger,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'overlay-message',
    templateUrl: 'overlay-message.html',
    animations: [
        trigger('slideUpDown', [
            transition(':enter', [style({transform: 'translateY(100%)'}), animate('.5s ease-out')]),
            transition(':leave', [animate('.2s ease-in', style({transform: 'translateY(100%)'}))])
        ])
    ]
})
export class OverlayMessageComponent implements OnInit {
    @Input() gameOver: boolean = false;
    @Input() newRecord: boolean = false;
    @Input() playerWon: boolean = false;
    @Input() difficulty: string;
    @Input() time: any;

    constructor() {
    }

    ngOnInit() {}

    formattedTime(time: any): string {
        return (this.time.min < 10 ? '0' : '') + this.time.min + ':'
            + (this.time.sec < 10 ? '0' : '') + this.time.sec + ':0'
            + this.time.micSec;
    }}
