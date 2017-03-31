import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'main-scene',
    templateUrl: 'main-scene.html'
})
export class MainScene implements OnInit {
    rows: number[];
    activeRow: number = 10;
    currentColor: string | null;

    constructor(public navCtrl: NavController) {
        this.currentColor = null;
        this.rows = this.fillRows();
    }

    ngOnInit() {
        //
    }

    fillRows(rows = 10): Array<number> {
        return Array<number>(rows)
            .fill(0)
            .map((v, i) => i + 1);
    }

}
