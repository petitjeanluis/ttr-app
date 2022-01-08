import { Injectable } from '@angular/core'
import {Destination} from '../models/destination';
import {TrainColor} from '../models/train-color';
import {PathID} from '../models/types';
import { GameSocketService } from './game-socket.service';
import { GameState } from '../state/game-state';
import { Router } from '@angular/router';
import { LocalStoreService } from './local-store.service';
import { StateUpdate as StateUpdate } from '../state/state-update';
import { Payload } from '../state/payload';
import { PlayerAction } from '../state/player-action';
import { BehaviorSubject, filter, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

    MENU_STATES: GameState[] = [GameState.MATCH_MAKING, GameState.PICK_INITIAL_DESTINATION_CARDS]
    GAME_STATES: GameState[] = [GameState.TURN, GameState.PICK_SECOND_TRAIN_CARD, GameState.PICK_DESTINATION_CARDS]

    private stateUpdateEmitter: BehaviorSubject<StateUpdate>

    constructor(private gameSocketService: GameSocketService, private router: Router, private localStoreService: LocalStoreService) {
        this.stateUpdateEmitter = new BehaviorSubject<StateUpdate>(null)

        // this.router.navigate(['menu'])
        this.localStoreService.clearGameId()
        
        this.gameSocketService.onConnected().then(() => {
            if (this.localStoreService.getGameId() && this.localStoreService.getPlayerName()) {
                this.router.navigate(['game-view']).then(_ => {
                    this.joinGame(this.localStoreService.getPlayerName(), this.localStoreService.getGameId())
                })
            }
            else {
                this.router.navigate(['menu'])
            }
        })

        this.gameSocketService.registerStateUpdateHandler((stateUpdate: StateUpdate) => {
            console.log("game engine received status");
            if (this.MENU_STATES.includes(stateUpdate.gameState)) {
                this.router.url != '/menu' && this.router.navigate(['menu'])
            }
            else if (this.GAME_STATES.includes(stateUpdate.gameState)) {
                this.router.url != '/game-view' && this.router.navigate(['game-view'])
            }
            
            setTimeout(() => {this.stateUpdateEmitter.next(stateUpdate)})
        })
    }
   
	registerStateUpdateHandler(stateUpdateHandler: (stateUpdate: StateUpdate) => void): Subscription {
		return this.stateUpdateEmitter.pipe(filter((item) => item != null)).subscribe(stateUpdateHandler)
	}

    // Actions

    createGame(playerName: string) {
        this.localStoreService.setPlayerName(playerName)

        this.gameSocketService.registerSingleShotStateUpdateHandler(
            (stateUpdate: StateUpdate) => {
                if (stateUpdate) {
                    this.localStoreService.setGameId(stateUpdate.gameId)
                }
            }
        )

        const payload: Payload = {
            action: PlayerAction.CREATE_GAME,
            payload: {
                id: this.localStoreService.getPlayerId(),
                name: this.localStoreService.getPlayerName()
            }
        }
        this.gameSocketService.sendMessage(payload)
    }

    joinGame(playerName: string, gameId: number) {
        this.localStoreService.setPlayerName(playerName)
        this.localStoreService.setGameId(gameId)

        const payload: Payload = {
            action: PlayerAction.JOIN_GAME,
            payload: {
                id: this.localStoreService.getPlayerId(),
                name: this.localStoreService.getPlayerName(),
                gameId: this.localStoreService.getGameId()
            }
        }
        this.gameSocketService.sendMessage(payload)
    }

    startGame() {
        const payload: Payload = {
            action: PlayerAction.START_GAME,
            payload: {
                id: this.localStoreService.getPlayerId(),
                gameId: this.localStoreService.getGameId()
            }
        }
        this.gameSocketService.sendMessage(payload)
    }

    pickDestinationCards(destinationCards: number[]): void {
        const payload: Payload = {
            action: PlayerAction.PICK_DESTINATION_CARDS,
            payload: {
                id: this.localStoreService.getPlayerId(),
                gameId: this.localStoreService.getGameId(),
                destinationCardIds: destinationCards
            }
        }
        this.gameSocketService.sendMessage(payload)
    }

    randomTrainCardPicked(): void {
        
    }

    trainCardPicked(trainCardSlot: number, pickedTrainCardColor: TrainColor): void {
        
    }

    destinationCardsPicked(destinationCards: Destination[], destinationCardSelection: boolean[]) {
        
    }

    takePath(pathId: PathID) {
        
    }
}
