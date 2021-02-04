import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/pluck';

import { GameStats } from '../models/stats';
import { Settings } from '../models/settings';

export type StoreData = Settings | GameStats;

export abstract class BaseStore<T extends StoreData> {
    private _store: BehaviorSubject<T>;

    public store$: Observable<T>;

    constructor(
        private storage: Storage,
        private defaultData: T,
        private key: string

    ) {
        this._store = new BehaviorSubject(<T>{});
        this.store$ = this._store.asObservable();
        this.setup();
    }

    setup() {
        this.readStorage()
            .do((data: T) => console.log(data))
            .subscribe(this._store);
    }

    readStorage() {
        return Observable.create((observer) => {
            this.storage.get(this.key)
                .then((data: T) => {
                    data === null
                        ? observer.next(this.defaultData)
                        : observer.next(data);
                });
        });
    }

    set(data: Partial<T>): void {
        data = Object.assign({}, this._store.value, data);

        this.storage.set(this.key, data)
        .then((value: T) => {
            this._store.next(value);
        });
    }
}
