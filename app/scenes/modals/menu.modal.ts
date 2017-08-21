import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Settings } from '../../models/settings';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameSettingsService } from '../../services/game-settings.service';

@Component({
    templateUrl: 'menu.html'
})
export class MenuModal {
    settingsForm: FormGroup;

    constructor(public viewCtrl: ViewController,
        private settingsService: GameSettingsService,
        private formBuilder: FormBuilder) {
            //
        }

    ngOnInit() {
        this.settingsForm = this.createForm();

        this.settingsService
            .settings$
            .subscribe((settings: Settings) => this.settingsForm.patchValue(settings));

        this.settingsForm
            .valueChanges
            .debounceTime(500)
            .distinctUntilChanged(this.comparator())
            .subscribe((value) => this.settingsService.set(value));
    }

    createForm(): FormGroup {
        return this.formBuilder
            .group({
                difficulty: 'hard',
                theme: 'default',
                duplicates: true
            });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    comparator(): (prev: any, next: any) => boolean {
        return (prev, next) => {
            return prev.theme === next.theme &&
                prev.difficulty === next.difficulty &&
                prev.duplicates === next.duplicates;
        }
    }
}

