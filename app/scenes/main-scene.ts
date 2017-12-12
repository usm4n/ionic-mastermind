import {
    OnInit,
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
import { StatsStore } from '../store/stats.store';
import { SettingsStore } from '../store/settings.store';
import { GameTimerComponent } from '../components/game-timer.component';
import { SequenceGeneratorService } from '../services/sequence-generator.service';

@Component({
    selector: 'main-scene',
    templateUrl: 'main-scene.html'
})
export class MainScene implements OnInit {
    @ViewChild(GameTimerComponent) timer;

    rows: number[];
    theme: string = 'defualt';
    activeRow: number = 10;
    currentColor: string | null;
    reset: boolean = false;
    running: boolean = false;

    constructor(
        public events: Events,
        public navCtrl: NavController,
        public sequenceGenerator: SequenceGeneratorService,
        public modalContrller: ModalController
    ) {
        this.rows = this.fillRows();
        this.events.subscribe('game:quit', _ => {
            this.resetGame();
            this.timer.reset();
        });
    }

    ngOnInit() {
        this.showMenu();
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
        if (event === false) this.activeRow--;

    }

    fillRows(rows = 10): Array<number> {
        return Array<number>(rows)
            .fill(0)
            .map((v, i) => i + 1);
    }
}
