import { Component } from '@angular/core';
import { Destination } from 'src/app/models/destination';
import { ID_CITY_MAP, PATHS } from 'src/app/resources/board-constants';
import { DESTINATION_MAP } from 'src/app/resources/destination-cards';
import { GameEngineService } from 'src/app/services/game-engine.service';
import { GameState } from 'src/app/state/game-state';
import { StateUpdate } from 'src/app/state/state-update';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  gameId: number

  showMenu: boolean
  showPlayers: boolean
  showDestinationCards: boolean
  stateUpdate: StateUpdate
  selectedDestinationCards = [false, false, false]

  constructor(private gameEngineService: GameEngineService) { 
    this.gameEngineService.registerStateUpdateHandler(this.stateUpdateHandler.bind(this))

    this.stateUpdate = null
    this.showMenu = true
    this.showPlayers = false
    this.showDestinationCards = false
  }

  stateUpdateHandler(stateUpdate: StateUpdate): void {
    this.stateUpdate = stateUpdate

    if (this.stateUpdate.gameState == GameState.MATCH_MAKING) {
      this.showPlayers = true
      this.showDestinationCards = this.showMenu = false
    }
    else if (this.stateUpdate.gameState == GameState.PICK_INITIAL_DESTINATION_CARDS) {
      this.showDestinationCards = true
      this.showMenu = this.showPlayers = false
    }
    else {
      this.showMenu = true
      this.showDestinationCards = this.showPlayers = false
    }
  }

  // Helpers
  getOrderedRoster(): string[] {
    const names: string[] = []

    names.push(this.stateUpdate.player.name)
    this.stateUpdate.opponents.forEach(opponent => names.push(opponent.name))
  
    return names.sort()
  }

  isHost(): boolean {
    return this.stateUpdate.hostId == this.stateUpdate.player.id
  }

  getDestinations(): Destination[] {
    const destinations: Destination[] = []

    for(let destinationId of this.stateUpdate.player.destinationOptionSet) {
      destinations.push(DESTINATION_MAP.get(destinationId))
    }

    return destinations
  }
  // 240535

  getCityName(cityId: number): string {
    return ID_CITY_MAP[cityId]
  }
  
  cardSelected(index: number): void {
    this.selectedDestinationCards[index] = this.selectedDestinationCards[index] ? false : true
  }

  isSelected(index: number): boolean {
    return this.selectedDestinationCards[index]
  }

  // Actions
  submitSelection(): void {
    let count = 0
    this.selectedDestinationCards.forEach((val) => {
      if (val) {
        count += 1
      }
    })
    if ( count < 2) {
      alert("Must select at least two destination cards!")
      return
    }

    const selectedIds = []
    for(let i = 0; i < this.stateUpdate.player.destinationOptionSet.length; i++) {
      if (this.selectedDestinationCards[i]) {
        selectedIds.push(this.stateUpdate.player.destinationOptionSet[i])
      }
    }

    this.gameEngineService.pickDestinationCards(selectedIds)
  }

  createGame() {
    this.gameEngineService.createGame("Luis")
  }

  joinGame() {
    if (this.gameId) {
      this.gameEngineService.joinGame("Squirrel", this.gameId)
    }
  }

  startGame() {
    this.gameEngineService.startGame()
  }

}
