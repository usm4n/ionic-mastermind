import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/pluck';

import { Settings } from '../models/settings';

@Injectable()
export abstract class AbstractSore {
    private _settings: BehaviorSubject<Settings>;

    settings$: Observable<Settings>;

    constructor(private storage: Storage) {
        this._settings = new BehaviorSubject(<Settings>{});
        this.settings$ = this._settings.asObservable();
        this.setup();
    }

    setup() {
        this.readStorage()
            .do((settings) => console.log(settings))
            .subscribe(this._settings);
    }

    readStorage() {
        return Observable.create((observer) => {
            this.storage.get('__settings')
                .then((settings) => {
                    settings === null
                        ? observer.next(CONFIG)
                        : observer.next(settings);
                });
        });
    }

    set(settings: {difficulty: string, theme: string, duplicates: boolean}): void {
        settings = Object.assign({}, this._settings.value, settings);

        this.storage.set('__settings', settings)
        .then((value) => {
            this._settings.next(value);
        });
    }
}
