import tap from 'lodash/tap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SequenceGeneratorService } from '../services/sequence-generator.service';
import { GameTimerComponent } from '../components/game-timer.component';
import { MainMenu } from './menu/main';
import { GameSettingsService } from '../services/game-settings.service';

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
        public navCtrl: NavController,
        public settingsService: GameSettingsService,
        public sequenceGenerator: SequenceGeneratorService,
        public modalContrller: ModalController
    ) {
        this.rows = this.fillRows();
    }

    ngOnInit() {
        this.showMenu();
        this.settingsService
            .theme$
            .subscribe((theme: string) => {this.theme = theme});
        this.setUp();
    }

    setUp() {
        this.sequenceGenerator.generateSequence();
        this.currentColor = null;
        this.activeRow = 10;
        this.timer.play();
    }

    showMenu() {
        this.running && this.timer.pause();

        tap(this.modalContrller.create(MainMenu, {running: this.running}), modal =>
            modal.onDidDismiss(command => this[command]())
        ).present();
    }

    play() {
        this.resetGame();
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
