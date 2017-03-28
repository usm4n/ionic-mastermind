import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { MainScene } from '../game/scenes/main-scene';
import { ColorChooserComponent } from '../game/scenes/components/color-chooser.component';
import { GameRowComponent } from '../game/scenes/components/game-row.component';

@NgModule({
    declarations: [
        MyApp,
        MainScene,
        ColorChooserComponent,
        GameRowComponent
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        MainScene
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
