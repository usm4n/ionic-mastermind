import {
    Component,
    Input,
} from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'alert',
    templateUrl: 'alert.html',
    animations: [
        trigger('slideRight', [
            transition(':enter', [style({transform: 'translateX(-100%)'}), animate('.5s ease-out')]),
            transition(':leave', [animate('.2s ease-in', style({transform: 'translateX(100%)'}))])
        ])
    ]
})
export class AlertComponent {
    @Input() message: string = 'Are you sure?';
    @Input() showAlert: boolean = false;

    private resolve: (boolean) => void;
    private reject: (boolean) => void;

    constructor() {}

    show() {
        this.showAlert = true;

        return new Promise<boolean>((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
    }

    dismiss(confirmation: boolean) {
        this.showAlert = false;

        if (confirmation) {
            this.resolve(true);
        } else {
            this.reject(false);
        }
    }
}
