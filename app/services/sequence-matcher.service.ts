import includes from 'lodash/includes';
import { Injectable } from '@angular/core';
import { SequenceGeneratorService } from './sequence-generator.service';

@Injectable()
export class SequenceMatcherService {
    private currentSequence: string[];

    constructor(
        private sequenceGenerator: SequenceGeneratorService,
    ) {
        this.setUp();
    }

    matchSequence(sequence: string[]): string[] {
        let lookup = [...this.currentSequence];

        let partialMatch = sequence.map((value, index) => {
            if (lookup[index] === value) {
                lookup[index] = 'visited';
                return 'exists';
            }

            return value;
        });

        let fullMatch = partialMatch.map((value, index) => {
            if (value === 'exists') return value;

            let lookupIndex = lookup.indexOf(value);

            if (includes(lookup, value)) {
                lookup[lookupIndex] = 'visited';
                return 'includes';
            }

            return 'notexist';
        });

        fullMatch.sort();

        return fullMatch;
    }

    setUp() {
        this.sequenceGenerator
            .sequence$
            .subscribe((value: string[]) => {
                this.currentSequence = value;
            });
    }

}

