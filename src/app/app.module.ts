import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { GameViewComponent } from './components/game-view/game-view.component';
import { DestinationCardSelectionComponent } from './components/destination-card-selection/destination-card-selection.component';
import { GameCardsComponent } from './components/game-cards/game-cards.component';
import { PlayerInfoComponent } from './components/player-info/player-info.component';

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
