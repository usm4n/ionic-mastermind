import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SequenceGeneratorService } from '../services/sequence-generator.service';
import { MenuModal } from '../modals/menu.modal';

@Component({
    selector: 'main-scene',
    templateUrl: 'main-scene.html'
})
export class MainScene implements OnInit {
    rows: number[];
    activeRow: number = 10;
    currentColor: string | null;

    constructor(public navCtrl: NavController,
        public sequenceGenerator: SequenceGeneratorService,
        public modalContrller: ModalController) {
        this.rows = this.fillRows();
    }

    ngOnInit() {
        this.modalContrller.create(MenuModal).present();
        this.sequenceGenerator.generateSequence();
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
