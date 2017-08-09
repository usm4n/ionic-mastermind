import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { MainScene } from './scenes/main-scene';
import { ColorChooserComponent } from './components/color-chooser.component';
import { GameRowComponent } from './components/game-row.component';
import { GameTimerComponent } from './components/game-timer.component';
import { ColorSlotDirective } from './components/directives/color-slot.directive';

import { GAME_CONFIG, CONFIG} from './services/game-settings.service';
import { SequenceGeneratorService } from './services/sequence-generator.service';
import { SequenceMatcherService } from './services/sequence-matcher.service';
import { MenuModal } from './scenes/modals/menu.modal';

@NgModule({
    declarations: [
        MyApp,
        MainScene,
        GameTimerComponent,
        ColorChooserComponent,
        GameRowComponent,
        ColorSlotDirective,
        MenuModal
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        MainScene,
        MenuModal
    ],
    providers: [
        {provide: GAME_CONFIG, useValue: CONFIG},
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        SequenceMatcherService,
        SequenceGeneratorService
    ]
})
export class AppModule {}
