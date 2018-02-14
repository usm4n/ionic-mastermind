import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { App, ViewController, NavParams, Platform } from 'ionic-angular';
import { Settings } from '../../models/settings';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsStore } from '../../store/settings.store';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    templateUrl: 'settings.html'
})
export class SettingsMenu implements OnInit {
    running: boolean = false;
    settingsForm: FormGroup;
    dissmissEvent$: Subject<boolean> = new Subject<boolean>();

    removeBackButtonAction: Function;

    constructor(
        public app: App,
        public platform: Platform,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        private settingsStore: SettingsStore,
        private formBuilder: FormBuilder
    ) {
        this.running = navParams.get('running');
    }

    ngOnInit() {
        this.settingsForm = this.createForm();

        this.settingsStore
            .store$
            .takeUntil(this.dissmissEvent$)
            .subscribe((settings: Settings) => this.settingsForm.patchValue(settings, {emitEvent: false}));

        this.settingsForm
            .valueChanges
            .debounceTime(500)
            .distinctUntilChanged(this.comparator())
            .takeUntil(this.dissmissEvent$)
            .subscribe((value) => this.settingsStore.set(value));
    }

    createForm(): FormGroup {
        return this.formBuilder
            .group({
                difficulty: {value: 'hard', disabled: this.running},
                theme: 'default',
                duplicates: {value: true, disabled: this.running},
            });
    }

    dismiss() {
        this.viewCtrl
            .dismiss()
            .then(() => this.dissmissEvent$.next(true));
    }

    comparator(): (prev: any, next: any) => boolean {
        return (prev, next) => {
            return prev.theme === next.theme &&
                prev.difficulty === next.difficulty &&
                prev.duplicates === next.duplicates;
        }
    }

    ionViewDidEnter() {
        this.removeBackButtonAction = this.platform.registerBackButtonAction(() => {
            this.app.goBack();
        }, 100);
    }

    ionViewWillLeave() {
        if (this.removeBackButtonAction) {
            this.removeBackButtonAction();
        }
    }
}

