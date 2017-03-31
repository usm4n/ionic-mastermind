import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { MainScene } from './scenes/main-scene';
import { ColorChooserComponent } from './components/color-chooser.component';
import { GameRowComponent } from './components/game-row.component';
import { GameTimerComponent } from './components/game-timer.component';
import { ColorSlotDirective } from './components/directives/color-slot.directive';

import { GAME_CONFIG, CONFIG} from './services/game-config.service';
import { SequenceGeneratorService } from './services/sequence-generator.service';
import { SequenceMatcherService } from './services/sequence-matcher.service';

@NgModule({
    declarations: [
        MyApp,
        MainScene,
        GameTimerComponent,
        ColorChooserComponent,
        GameRowComponent,
        ColorSlotDirective
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        MainScene
    ],
    providers: [
        {provide: GAME_CONFIG, useValue: CONFIG},
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        SequenceMatcherService,
        SequenceGeneratorService
    ]
})
export class AppModule {}
