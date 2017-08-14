import includes from 'lodash/includes';
import uniq from 'lodash/uniq';
import countBy from 'lodash/countBy';
import { Injectable } from '@angular/core';
import { GameSettingsService } from './game-settings.service';
import { SequenceGeneratorService } from './sequence-generator.service';

@Injectable()
export class SequenceMatcherService {
    private currentSequence: string[];
    private duplicateCount: number = 0;

    constructor(private sequenceGenerator: SequenceGeneratorService,
        private settingsService: GameSettingsService) {
        this.setUp();
    }

    matchSequence(sequence: string[]): string[] {
        let lookup = [...this.currentSequence];
        console.log('duplicate count:' + this.duplicateCount);
        console.log(this.currentSequence);
        console.log(sequence);

        let matches = sequence.map((value, index, sequence) => {
            let lookupIndex = lookup.indexOf(value);

            if (includes(lookup, value)) {
                if (index === lookupIndex) {
                    lookup[lookupIndex] = 'visited';

                    return 'exists';
                } else {
                    if (includes(sequence, value, index + 1) &&
                        this.countDuplicates(sequence.slice(index+1), value) > this.duplicateCount) {
                        return 'notexist';
                    }

                    lookup[lookupIndex] = 'visited';

                    return 'includes';
                }
            } else {
                return 'notexist';
            }
        });

        // matches.sort();

        return matches;
    }

    setUp() {
        this.sequenceGenerator
            .sequence$
            .subscribe((value: string[]) => {
                this.currentSequence = value;

                if (this.hasDuplicates()) {
                    this.duplicateCount = 1;
                } else {
                    this.duplicateCount = 0;
                }
            });
    }

    countDuplicates(sequence, value): number {
        return countBy(sequence)[value];
    }

    hasDuplicates(): boolean {
        return uniq(this.currentSequence).length !== this.currentSequence.length;
    }
}

