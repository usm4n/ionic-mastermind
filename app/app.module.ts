import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { MainScene } from './scenes/main-scene';
import { ColorChooserComponent } from './components/color-chooser.component';
import { GameRowComponent } from './components/game-row.component';
import { GameTimerComponent } from './components/game-timer.component';
import { ColorSlotDirective } from './components/directives/color-slot.directive';
import { OverlayMessageComponent } from './components/overlay-message.component';

import { StatsStore } from './store/stats.store';
import { SettingsStore } from './store/settings.store';

import { SequenceGeneratorService } from './services/sequence-generator.service';
import { SequenceMatcherService } from './services/sequence-matcher.service';
import { MainMenu } from './scenes/menu/main';
import { SettingsMenu } from './scenes/menu/settings';
import { AlertComponent } from './components/alert.component';

@NgModule({
    declarations: [
        MyApp,
        MainScene,
        GameTimerComponent,
        ColorChooserComponent,
        GameRowComponent,
        ColorSlotDirective,
        OverlayMessageComponent,
        AlertComponent,
        MainMenu,
        SettingsMenu
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        ReactiveFormsModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        MainScene,
        MainMenu,
        SettingsMenu
    ],
    providers: [
        StatusBar,
        StatsStore,
        SplashScreen,
        SettingsStore,
        SequenceMatcherService,
        SequenceGeneratorService,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
    ]
})
export class AppModule {}
