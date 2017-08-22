import { Component } from '@angular/core';
import { MainMenu } from './main-menu.ts';
import { SettingsMenu } from './settings-menu.ts';

@Component({
    templateUrl: 'menu-modal.html'
})
export class MenuModal {
    mainMenu     = MainMenu
    settingsMenu = SettingsMenu;

    constructor() {

    }
}
