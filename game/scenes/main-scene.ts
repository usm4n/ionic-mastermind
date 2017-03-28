import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NavController } from 'ionic-angular';

@Component({
    selector: 'main-scene',
    templateUrl: 'main-scene.html'
})
export class MainScene implements OnInit {
    rows: number[];
    activeRow: number = 10;

    currentColor: string | null;

    timer$ : Observable<number>;
    timer = {min: 0, sec: 0, micSec: 0, counter: 0};

    constructor(public navCtrl: NavController) {
        this.currentColor = null;
        this.rows = this.fillRows();
        this.timer$ = this.getTimerStream();
    }

    ngOnInit() {
        this.timer$.subscribe(() => this.setTimerValues());
    }

    fillRows(rows = 10): Array<number> {
        return Array<number>(rows)
            .fill(0)
            .map((v, i) => i + 1);
    }

    getTimerStream() {
        return Observable.interval(100);
    }

    setTimerValues() {
        let sec, micros;

        micros = this.timer.counter;
        sec = micros / 10;

        this.timer.micSec = micros % 10;
        this.timer.min = Math.floor(sec / 60);
        this.timer.sec = Math.floor(sec % 60);

        ++ this.timer.counter;
    }

    getFormatedTimer() {
        return (this.timer.min < 10 ? '0' : '') + this.timer.min + ' : '
            + (this.timer.sec < 10 ? '0' : '') + this.timer.sec + ' : 0'
            + this.timer.micSec;
    }

}
