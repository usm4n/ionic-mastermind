import { Injectable, Inject } from '@angular/core';

import sampleSize from 'lodash/sampleSize'
import { GameSettingsService } from './game-settings.service';

@Injectable()
export class SequenceGeneratorService {
    private _sequence: string[];

    constructor(public settingsService: GameSettingsService) {}

    generateSequence() {
        //use withLatesFrom with a subject to control the generation of the sequence.
        this.settingsService
            .settings$
            .subscribe(settings => this._sequence = sampleSize<string>(settings['colors'], 4));
    }

    get sequence() {
        return this._sequence || [];
    }
}

