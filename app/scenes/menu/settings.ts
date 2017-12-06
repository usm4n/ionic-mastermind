import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ViewController } from 'ionic-angular';
import { Settings } from '../../models/settings';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsStore } from '../../store/settings.store';

@Component({
    templateUrl: 'settings.html'
})
export class SettingsMenu implements OnInit {
    settingsForm: FormGroup;
    dissmissEvent: Subject<boolean> = new Subject<boolean>();

    constructor(
        public viewCtrl: ViewController,
        private settingsStore: SettingsStore,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.settingsForm = this.createForm();

        this.settingsStore
            .store$
            .takeUntil(this.dissmissEvent)
            .subscribe((settings: Settings) => this.settingsForm.patchValue(settings, {emitEvent: false}));

        this.settingsForm
            .valueChanges
            .debounceTime(500)
            .distinctUntilChanged(this.comparator())
            .takeUntil(this.dissmissEvent)
            .subscribe((value) => this.settingsStore.set(value));
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
        this.viewCtrl
            .dismiss()
            .then(() => this.dissmissEvent.next(true));
    }

    comparator(): (prev: any, next: any) => boolean {
        return (prev, next) => {
            return prev.theme === next.theme &&
                prev.difficulty === next.difficulty &&
                prev.duplicates === next.duplicates;
        }
    }
}

