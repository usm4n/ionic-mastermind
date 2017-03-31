import { Injectable } from '@angular/core';
import shuffle from 'lodash/shuffle';
import includes from 'lodash/includes';

import { SequenceGeneratorService } from './sequence-generator.service';

@Injectable()
export class SequenceMatcherService {
    private currentSequence: string[];

    constructor(private sequenceGenerator: SequenceGeneratorService) {
        this.currentSequence = this.sequenceGenerator.sequence;
    }

    matchSequence(sequence: string[]): string[] {
        let matches = sequence.map((value, index) => {
            if (includes(this.currentSequence, value)) {
                if (index === this.currentSequence.indexOf(value)) {
                    return 'matched';
                } else { return 'includes'; }
            } else {
                return 'nomatch';
            }
        });

        return shuffle(matches);
    }
}

