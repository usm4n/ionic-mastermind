import {
    Events,
    NavParams,
    ViewController,
    ModalController
} from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { SettingsMenu } from './settings';
import { Stats, GameStats } from '../../models/stats';
import { StatsStore } from '../../store/stats.store';
import { SettingsStore } from '../../store/settings.store';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Settings } from '../../models/settings';

@Component({
    templateUrl: 'main.html'
})
export class MainMenu implements OnInit {
    public stats: Stats;
    public settings: Settings;
    public running: boolean = false;

    menuDestroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public events: Events,
        public navParams: NavParams,
        public statsStore: StatsStore,
        public viewCtrl: ViewController,
        public settingsStore: SettingsStore,
        public modalContrller: ModalController
    ) {
        this.running = navParams.get('running');
    }

    ngOnInit() {
        combineLatest(
            this.statsStore.store$,
            this.settingsStore.store$
        )
        .takeUntil(this.menuDestroyed$)
        .subscribe(([stats, settings]) => {
            this.stats = stats[settings.difficulty];
            this.settings = settings;
        });
    }

    play() {
        this.viewCtrl
            .dismiss('play')
            .then(() => this.menuDestroyed$.next(true));
    }

    resume() {
        this.viewCtrl
            .dismiss('resume')
            .then(() => this.menuDestroyed$.next(true));
    }

    quitGame() {
        this.running = false;
        this.events.publish('game:quit');
    }

    settingsMenu() {
        this.modalContrller.create(SettingsMenu, {running: this.running}).present();
    }
}
