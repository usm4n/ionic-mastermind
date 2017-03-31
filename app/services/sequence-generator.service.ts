import { Injectable, Inject } from '@angular/core';

import sampleSize from 'lodash/sampleSize'
import { GAME_CONFIG } from './game-config.service';

@Injectable()
export class SequenceGeneratorService {
    private _sequence: string[];

    constructor(@Inject(GAME_CONFIG) private config) {}

    generateSequence() {
        this._sequence = sampleSize<string>(this.config.colors, 4);
    }

    get sequence() {
        return this._sequence;
    }
}


