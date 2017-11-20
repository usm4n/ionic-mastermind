import {
    Events,
    NavParams,
    ViewController,
    ModalController
} from 'ionic-angular';
import { Component } from '@angular/core';
import { SettingsMenu } from './settings';

@Component({
    templateUrl: 'main.html'
})
export class MainMenu {
    public running: boolean = false;

    constructor(
        public events: Events,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public modalContrller: ModalController
    ) {
        this.running = navParams.get('running');
    }

    play() {
        this.viewCtrl.dismiss('play');
    }

    resume() {
        this.viewCtrl.dismiss('resume');
    }

    quitGame() {
        this.running = false;
        this.events.publish('game:quit');
    }

    settings() {
        this.modalContrller.create(SettingsMenu).present();
    }
}
