import {
    OnInit,
    OnDestroy,
    ViewChild,
    Component,
} from '@angular/core';
import {
    Events,
    NavController,
    ModalController
} from 'ionic-angular';
import tap from 'lodash/tap';
import { MainMenu } from './menu/main';
import { Subject } from 'rxjs/Subject';
import { GameStats } from '../models/stats';
import { StatsStore } from '../store/stats.store';
import { SettingsStore } from '../store/settings.store';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { GameTimerComponent } from '../components/game-timer.component';
import { SequenceGeneratorService } from '../services/sequence-generator.service';

import 'rxjs/add/operator/do';

@Component({
    selector: 'main-scene',
    templateUrl: 'main-scene.html'
})
export class MainScene implements OnInit, OnDestroy {
    @ViewChild(GameTimerComponent) timer;

    readonly lastRow: number = 1;

    rows: number[];
    stats: GameStats;
    difficulty: string;
    activeRow: number = 10;
    reset: boolean = false;
    running: boolean = false;
    currentColor: string | null;

    sceneDestroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public events: Events,
        public statsStore: StatsStore,
        public navCtrl: NavController,
        public settingsStore: SettingsStore,
        public modalContrller: ModalController,
        public sequenceGenerator: SequenceGeneratorService,
    ) {
        this.rows = this.fillRows();
        this.events.subscribe('game:quit', _ => {
            this.resetGame();
            this.timer.reset();
        });
    }

    ngOnInit() {
        this.showMenu();

        combineLatest(
            this.statsStore.store$,
            this.settingsStore.difficulty$
        )
        .do(([stats, difficulty]: [GameStats, string]) => this.difficulty = difficulty)
        .map(([stats, difficulty]: [GameStats, string]) => stats[difficulty])
        .takeUntil(this.sceneDestroyed$)
        .subscribe(stats => this.stats = stats);
    }

    ngOnDestroy() {
        this.sceneDestroyed$.next(true);
    }

    setUp() {
        this.sequenceGenerator.generateSequence();
        this.currentColor = null;
        this.activeRow = 10;
    }

    showMenu() {
        this.running && this.timer.pause();

        tap(this.modalContrller.create(MainMenu, {running: this.running}), modal =>
            modal.onDidDismiss(command => this[command]())
        ).present();
    }

    play() {
        this.resetGame();
        this.timer.play();
    }

    resume() {
        this.timer.play();
    }

    resetGame() {
        this.setUp();
        this.reset = true;
        this.running = true;
    }

    update(event) {
        if(event === true) {
            this.gameWon();
        } else if (this.activeRow > this.lastRow) {
            this.activeRow--;
        } else {
            this.gameOver();
        }
    }

    gameWon() {

    }

    gameOver() {

    }

    fillRows(rows = 10): Array<number> {
        return Array<number>(rows)
            .fill(0)
            .map((v, i) => i + 1);
    }
}
