import includes from 'lodash/includes';
import { Injectable } from '@angular/core';
import { GameSettingsService } from './game-settings.service';
import { SequenceGeneratorService } from './sequence-generator.service';

@Injectable()
export class SequenceMatcherService {
    private currentSequence: string[];

    constructor(private sequenceGenerator: SequenceGeneratorService,
        private settingsService: GameSettingsService) {
        this.setUp();
    }

    matchSequence(sequence: string[]): string[] {
        let lookup = [...this.currentSequence];

        let exists = sequence.map((value, index) => {
            if (lookup[index] === value) {
                lookup[index] = 'visited';
                return 'exists';
            }

            return 'notexist';
        });

        let others = sequence.map((value, index) => {
            let lookupIndex = lookup.indexOf(value);

            if (includes(lookup, value)) {
                lookup[lookupIndex] = 'visited';
                return 'includes';
            }

            return 'notexist';
        });

        exists.sort();
        others.sort();

        let index = exists.lastIndexOf('exists') + 1;
        let otherIndex = others.length - index;

        return [...exists.slice(0, index), ...others.slice(0, otherIndex)];
    }

    setUp() {
        this.sequenceGenerator
            .sequence$
            .subscribe((value: string[]) => {
                this.currentSequence = value;
            });
    }

}

