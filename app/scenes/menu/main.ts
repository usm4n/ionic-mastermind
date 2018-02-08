import {
    Events,
    NavParams,
    ViewController,
    ModalController
} from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { SettingsMenu } from './settings';
import { GameStats } from '../../models/stats';
import { StatsStore } from '../../store/stats.store';
import { SettingsStore } from '../../store/settings.store';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
    templateUrl: 'main.html'
})
export class MainMenu implements OnInit {
    public stats: GameStats;
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
            this.settingsStore.difficulty$
        )
        .map(([stats, difficulty]: [GameStats, string]) => stats[difficulty])
        .takeUntil(this.menuDestroyed$)
        .subscribe(stats => this.stats = stats);
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

    settings() {
        this.modalContrller.create(SettingsMenu).present();
    }
}
