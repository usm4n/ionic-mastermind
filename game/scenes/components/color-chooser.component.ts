import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

@Component({
    selector: 'color-chooser',

    templateUrl: 'color-chooser.html'
})
export class ColorChooserComponent {
    @Input() selectedColor: string;
    @Output() selectedColorChange = new EventEmitter<string>();

    colorClasses: string[] = [
        'orange',
        'yellow',
        'green',
        'cyan',
        'blue',
        'magenta',
        'pink',
        'red',
        'grey',
        'black'
    ];

    updateColor(color) {
        this.selectedColor = color;
        this.selectedColorChange.emit(color);
    }

    _lert(c) {
        window.alert(c);
    }

}
