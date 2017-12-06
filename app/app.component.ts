import { Component } from '@angular/core';
import { App, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SettingsStore } from './store/settings.store';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MainScene } from './scenes/main-scene'

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage = MainScene;
    currentClass = 'default';

    constructor(
        appService: App,
        platform: Platform,
        settingsStore: SettingsStore,
        splashScreen: SplashScreen,
        statusBar: StatusBar
    ) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            settingsStore.theme$.subscribe((theme: string) => {
                if(theme) {
                    appService.setElementClass(this.currentClass, false);
                    appService.setElementClass(theme, true);

                    this.currentClass = theme;
                }
            });
        });
    }
}
