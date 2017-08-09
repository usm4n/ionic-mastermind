import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SequenceGeneratorService } from '../services/sequence-generator.service';
import { GameTimerComponent } from '../components/game-timer.component';
import { SequenceMatcherService } from '../services/sequence-matcher.service';
import { MenuModal } from './modals/menu.modal';

@Component({
    selector: 'main-scene',
    templateUrl: 'main-scene.html'
})
export class MainScene implements OnInit {
    @ViewChild(GameTimerComponent) timer;

    rows: number[];
    activeRow: number = 10;
    currentColor: string | null;
    reset: boolean = false;

    constructor(public navCtrl: NavController,
        public sequenceGenerator: SequenceGeneratorService,
        public sequenceMatcherService: SequenceMatcherService,
        public modalContrller: ModalController) {
        this.rows = this.fillRows();
    }

    ngOnInit() {
        this.modalContrller.create(MenuModal).present();
        this.setUp();
    }

    setUp() {
        this.sequenceGenerator.generateSequence();
        this.sequenceMatcherService.setUpSequence();
        this.currentColor = null;
        this.activeRow = 10;
    }

    resetGame() {
        this.setUp();
        this.reset = true;
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
