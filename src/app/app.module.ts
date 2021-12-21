import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BoardComponent } from './components/board/board.component'
import { CardBankComponent } from './components/card-bank/card-bank.component'
import { PlayerBankComponent } from './components/player-bank/player-bank.component';
import { ModalComponent } from './components/modal/modal.component'
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardBankComponent,
    PlayerBankComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
