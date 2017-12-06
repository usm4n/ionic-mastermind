import { BaseStore } from './base.store';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/pluck';

import { Settings } from '../models/settings';

const CONFIG: Settings = {
    colors: [
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
    ],
    difficulty: 'hard',
    duplicates: false,
    theme: 'default'
};

@Injectable()
export class SettingsStore extends BaseStore<Settings> {
    constructor(storage: Storage) {
        super(storage, CONFIG, '__settings');
    }

    get colors$() {
        return this.store$
            .pluck('colors')
            .withLatestFrom(this.difficulty$, (colors: string[], difficulty) => {
                switch (difficulty) {
                    case 'easy':
                        return colors.slice(0, 6);
                    case 'medium':
                        return colors.slice(0, 8);
                    default:
                        return colors;
                }
            });
    }

    get difficulty$() {
        return this.store$
            .pluck('difficulty');
    }

    get theme$() {
        return this.store$
            .pluck('theme');
    }

    get duplicates$() {
        return this.store$
            .pluck('duplicates');
    }
}
