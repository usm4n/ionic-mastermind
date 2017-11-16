import { Component } from '@angular/core';
import { SettingsMenu } from './settings';
import { ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

@Component({
    templateUrl: 'main.html'
})
export class MainMenu {

    constructor(
        public viewCtrl: ViewController,
        public modalContrller: ModalController
    ) {}

    play() {
        this.viewCtrl.dismiss('play');
    }

    settings() {
        this.modalContrller.create(SettingsMenu).present();
    }
}
