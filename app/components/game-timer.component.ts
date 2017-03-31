import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'game-timer',
    template: `<p>{{getFormatedTimer()}}</p>`
})
export class GameTimerComponent implements OnInit {
    timer$ : Observable<number>;
    timer = {min: 0, sec: 0, micSec: 0, counter: 0};

    constructor() {
        this.timer$ = this.getTimerStream();
    }

    ngOnInit() {
        this.timer$.subscribe(() => this.setTimerValues());
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
