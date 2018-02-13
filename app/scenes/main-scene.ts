import {
    OnInit,
    OnDestroy,
    ViewChild,
    Component,
} from '@angular/core';
import {
    Events,
    NavController,
    ModalController,
} from 'ionic-angular';
import tap from 'lodash/tap';
import { MainMenu } from './menu/main';
import { Subject } from 'rxjs/Subject';
import { Stats, GameStats } from '../models/stats';
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

    gameOver: boolean = false;
    playerWon: boolean = false;
    newRecord: boolean = false;

    rows: number[];
    stats: Stats;
    reset: boolean = false;
    difficulty: string;
    activeRow: number = 10;
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
        .subscribe((stats: Stats) => this.stats = stats);
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
        this.running = true;
        this.stats.numberOfGames++;
        this.statsStore.set({
            [this.difficulty]: this.stats
        });
    }

    resume() {
        this.timer.play();
    }

    replay() {
    }

    resetGame() {
        this.setUp();
        // chains down to rows for reset event.
        this.reset = true;
        this.gameOver = false;
        this.playerWon = false;
        this.newRecord = false;
    }

    update(event) {
        if(event === true) {
            this.gameWon();
        } else if (this.activeRow > this.lastRow) {
            this.activeRow--;
        } else {
            this.gameLost();
        }
    }

    gameWon() {
        this.timer.pause();
        this.running = false;
        this.gameOver = true;
        this.playerWon = true;

        let time = this.timer.value();

        if (time.counter < this.stats.bestTime.counter) {
            this.newRecord = true;
            this.stats.bestTime = time;
            this.statsStore.set({
                [this.difficulty]: this.stats
            });
        }
    }

    gameLost() {
        this.timer.pause();
        this.running = false;
        this.gameOver = true;
        this.playerWon = false;
    }

    fillRows(rows = 10): Array<number> {
        return Array<number>(rows)
            .fill(0)
            .map((v, i) => i + 1);
    }
}
