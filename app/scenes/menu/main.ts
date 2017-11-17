import {
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

    settings() {
        this.modalContrller.create(SettingsMenu).present();
    }
}
