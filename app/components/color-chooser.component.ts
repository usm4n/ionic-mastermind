import {
    Component,
    Input,
    Output,
    EventEmitter,
    Inject
} from '@angular/core';

import { GAME_CONFIG } from '../services/game-config.service'

@Component({
    selector: 'color-chooser',

    templateUrl: 'color-chooser.html'
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
