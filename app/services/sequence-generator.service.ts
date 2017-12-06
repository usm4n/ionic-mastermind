import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SettingsStore } from '../store/settings.store';

import sampleSize from 'lodash/sampleSize'


@Injectable()
export class SequenceGeneratorService {
    private _generator: Subject<boolean> = new Subject<boolean>();
    private _stop: Subject<boolean> = new Subject<boolean>();
    private _sequence: BehaviorSubject<string[]> = new BehaviorSubject(<string[]> []);

    constructor(public settingsStore: SettingsStore) {
        this._generator
            .withLatestFrom(
                this.settingsStore.colors$,
                this.settingsStore.duplicates$,
                (_, colors, duplicates) => {
                    return !duplicates
                        ? sampleSize<string>(colors, 4)
                        : [...sampleSize<string>(colors, 2), ...sampleSize<string>(colors, 2)];
                })
            .takeUntil(this._stop)
            .subscribe((sequence: string[]) => {
                console.log('in generator')
                console.log(sequence);
                this._sequence.next(sequence);
            });

    }

    generateSequence() {
        this._generator.next(true);
    }

    get sequence$() {
        return this._sequence.asObservable();
    }

    stop() {
        this._stop.next(true);
    }
}

