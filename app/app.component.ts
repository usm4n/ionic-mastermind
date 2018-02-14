import { Component } from '@angular/core';
import { App, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SettingsStore } from './store/settings.store';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

import { MainScene } from './scenes/main-scene'
import { SettingsMenu } from './scenes/menu/settings';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage = MainScene;
    currentClass = 'default';

    constructor(
        public app: App,
        platform: Platform,
        settingsStore: SettingsStore,
        splashScreen: SplashScreen,
        statusBar: StatusBar,
        fullScreen: AndroidFullScreen
    ) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            settingsStore.theme$.subscribe((theme: string) => {
                if(theme) {
                    this.app.setElementClass(this.currentClass, false);
                    this.app.setElementClass(theme, true);

                    this.currentClass = theme;
                }
            });

            fullScreen.isImmersiveModeSupported()
                .then(() => fullScreen.immersiveMode())
                .catch((error: any) => console.log(error));

            platform.registerBackButtonAction(() => {}, 100);
        });
    }
}
