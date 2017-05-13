import { Injectable } from '@angular/core';
import includes from 'lodash/includes';

import { SequenceGeneratorService } from './sequence-generator.service';

@Injectable()
export class SequenceMatcherService {
    private currentSequence: string[];

    constructor(private sequenceGenerator: SequenceGeneratorService) {
        this.setUpSequence();
        console.log(this.currentSequence);
    }

    matchSequence(sequence: string[]): string[] {
        let lookup = [...this.currentSequence];

        let matches = sequence.map((value, index, sequence) => {
            let lookupIndex = lookup.indexOf(value);
            if (includes(lookup, value)) {
                if (index === lookupIndex) {
                    lookup[lookupIndex] = 'visited';
                    return 'exists';
                } else {
                    if (includes(sequence, value, index + 1)) {
                        return 'notexist';
                    }
                    lookup[lookupIndex] = 'visited';
                    return 'includes';
                }
            } else {
                return 'notexist';
            }
        });

        matches.sort();

        return matches;
    }

    setUpSequence() {
        this.currentSequence = this.sequenceGenerator.sequence;
    }
}

