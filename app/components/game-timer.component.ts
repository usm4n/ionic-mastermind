import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ISubscription } from 'rxjs/Subscription';

@Component({
    selector: 'game-timer',
    template: `{{getFormatedTimer()}}`
})
export class GameTimerComponent implements OnInit {
    timerCtrl : Subject<boolean> = new Subject<boolean>();
    timer$ : Observable<any>;
    tick$ : Observable<number>;

    timerSubscription: ISubscription;

    timer = {min: 0, sec: 0, micSec: 0, counter: 0};

    constructor() {
        this.tick$ = this.getTickStream();
        this.timer$ = this.createTimer();
    }

    ngOnInit() {
        this.timerSubscription = this.timer$.subscribe(() => this.setTimerValues());
    }

    getTickStream() {
        return Observable.interval(100);
    }

    createTimer(): Observable<any> {
        return this.timerCtrl.asObservable()
            .switchMap<boolean, any>((state: boolean) => !state ? Observable.never() : this.tick$);
    }

    play() {
        this.timerCtrl.next(true);
    }

    pause() {
        this.timerCtrl.next(false);
    }

    reset() {
        this.timer = {
            min: 0,
            sec: 0,
            micSec: 0,
            counter: 0
        }
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

    getFormatedTimer(): string {
        return (this.timer.min < 10 ? '0' : '') + this.timer.min + ':'
            + (this.timer.sec < 10 ? '0' : '') + this.timer.sec + ':0'
            + this.timer.micSec;
    }

    ngOnDestroy() {
        this.timerSubscription.unsubscribe();
    }
}
