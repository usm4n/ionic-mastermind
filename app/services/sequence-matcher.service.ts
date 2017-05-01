import { Injectable } from '@angular/core';
import includes from 'lodash/includes';

import { SequenceGeneratorService } from './sequence-generator.service';

@Injectable()
export class SequenceMatcherService {
    private currentSequence: string[];

    constructor(private sequenceGenerator: SequenceGeneratorService) {
        this.currentSequence = this.sequenceGenerator.sequence;
        console.log(this.currentSequence);
    }

    matchSequence(sequence: string[]): string[] {
        let matches = sequence.map((value, index) => {
            if (includes(this.currentSequence, value)) {
                if (index === this.currentSequence.indexOf(value)) {
                    return 'exists';
                } else { return 'includes'; }
            } else {
                return 'notexist';
            }
        });

        matches.sort();

        return matches;
    }
}

