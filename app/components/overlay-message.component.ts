import {
    Component,
    OnInit,
    Input,
} from '@angular/core';

@Component({
    selector: 'overlay-message',
    templateUrl: 'overlay-message.html'
})
export class OverlayMessageComponent implements OnInit {
    @Input() gameOver: boolean = false;
    @Input() newRecord: boolean = false;
    @Input() playerWon: boolean = false;

    constructor() {
    }

    ngOnInit() {}
}
