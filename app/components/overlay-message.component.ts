import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';

@Component({
    selector: 'overlay-message',
    templateUrl: 'overlay-message.html'
})
export class OverlayMessageComponent implements OnInit {
    @Input() hiddenSequence: string[];
    @Input() gameOver: boolean = false;
    @Output() reset = new EventEmitter<boolean>();

    constructor() {}

    resetGame() {
        this.reset.emit(true);
    }

    ngOnInit() {}
}
