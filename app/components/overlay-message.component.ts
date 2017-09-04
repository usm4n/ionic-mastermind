import {
    Component,
    OnInit,
    Input,
    Output
} from '@angular/core';

@Component({
    selector: 'overlay-message',
    templateUrl: 'overlay-message.html'
})
export class OverlayMessageComponent implements OnInit {
    @Input() hiddenSequence: string[];
    @Input() gameOver: boolean = false;

    constructor() {}

    ngOnInit() {}
}
