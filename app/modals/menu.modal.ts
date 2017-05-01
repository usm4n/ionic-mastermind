import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'menu.html'
})
export class MenuModal {
    constructor(public viewCtrl: ViewController) {}

    dismiss() {
        this.viewCtrl.dismiss();
    }

}

