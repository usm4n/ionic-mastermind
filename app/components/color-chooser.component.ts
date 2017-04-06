import {
    Component,
    Input,
    Output,
    EventEmitter,
    Inject,
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/core';

import { GAME_CONFIG } from '../services/game-config.service'

@Component({
    selector: 'color-chooser',
    templateUrl: 'color-chooser.html',
    animations: [
        trigger('chooserState', [
            state('false', style({
                transform: 'scale(1)'
            })),
            state('true', style({
                transform: 'scale(1.2)'
            })),
            transition('0 => 1', animate('.2s ease-out')),
            transition('1 => 0', animate('.05s ease-in'))
        ])
    ]
})
export class ColorChooserComponent {
    @Input() selectedColor: string;
    @Output() selectedColorChange = new EventEmitter<string>();

    colorClasses: string[];
    constructor(@Inject(GAME_CONFIG) private config) {
        this.colorClasses = config.colors;
    }

    updateColor(color) {
        this.selectedColor = color;
        this.selectedColorChange.emit(color);
    }
}
