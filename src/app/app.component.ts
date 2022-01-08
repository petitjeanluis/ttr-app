import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameEngineService } from './services/game-engine.service';
import { LocalStoreService } from './services/local-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'OnlineTicketToRide';

  constructor(private gameEngineService: GameEngineService) {
  }
}
