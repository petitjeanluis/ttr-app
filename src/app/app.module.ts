import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { GameViewComponent } from './game-view/game-view.component';
import { DestinationCardSelectionComponent } from './destination-card-selection/destination-card-selection.component';
import { GameCardsComponent } from './game-cards/game-cards.component';
import { PlayerInfoComponent } from './player-info/player-info.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameViewComponent,
    DestinationCardSelectionComponent,
    GameCardsComponent,
    PlayerInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
