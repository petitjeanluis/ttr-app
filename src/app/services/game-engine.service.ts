import { Injectable } from '@angular/core'
import { GameSocketService } from './game-socket.service';
import { GameState } from '../state/game-state';
import { Router } from '@angular/router';
import { LocalStoreService } from './local-store.service';
import { StateUpdate as StateUpdate } from '../state/state-update';
import { Payload } from '../state/payload';
import { PlayerAction } from '../state/player-action';
import { BehaviorSubject, filter, Subscription } from 'rxjs';
import { PathID } from '../models/types';
import { TrainColor } from '../models/train-color';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

    MENU_STATES: GameState[] = [GameState.MATCH_MAKING, GameState.PICK_INITIAL_DESTINATION_CARDS]
    GAME_STATES: GameState[] = [GameState.TURN, GameState.PICK_SECOND_TRAIN_CARD, GameState.PICK_DESTINATION_CARDS]

    private stateUpdateEmitter: BehaviorSubject<StateUpdate>

    constructor(private gameSocketService: GameSocketService, private router: Router, private localStoreService: LocalStoreService) {
        this.stateUpdateEmitter = new BehaviorSubject<StateUpdate>(null)

        // 659475        
        this.gameSocketService.onConnected().then(() => {
            this.router.navigate(['menu'])
        })

        this.gameSocketService.registerStateUpdateHandler(this.handleStateUpdate.bind(this))

        // for mock only
        // this.gameSocketService.onConnected().then(() => {
        //     this.gameSocketService.disconnect()
        //     this.router.navigate(['game-view']).then(() => {
        //         const stateUpdate: StateUpdate = JSON.parse('{"pathOwnership": {}, "opponents": [{"name": "Squirrel", "color": "GREEN", "trainCardCount": 4, "destinationCardCount": 2, "trainCount": 45, "pathScore": 0}], "availableCards": ["RED", "PINK", "WHITE", "BLACK", "BLUE"], "player": {"id": 744912, "name": "Luis", "connectionId": "LvWOedd-oAMCLfg=", "color": "BLACK", "trainCards": ["YELLOW", "YELLOW", "BLACK", "ORANGE"], "destinationCards": [21, 29], "trainCount": 45, "pathScore": 0, "destinationOptionSet": []}, "activePlayerId": 744912, "gameState": "TURN", "gameId": 256156, "hostId": 744912}')
        //         this.handleStateUpdate(stateUpdate)
        //     })
        // })
        // this.gameSocketService.sendMessage = (payload: Payload) => {
        //     console.log(payload);
        // }
    }

    handleStateUpdate(stateUpdate: StateUpdate) {
        if (this.MENU_STATES.includes(stateUpdate.gameState)) {
            this.router.url != '/menu' && this.router.navigate(['menu'])
        }
        else if (this.GAME_STATES.includes(stateUpdate.gameState)) {
            this.router.url != '/game-view' && this.router.navigate(['game-view'])
        }
        
        setTimeout(() => {this.stateUpdateEmitter.next(stateUpdate)})
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

    pickTrainCard(trainCardIndex: number): void {
        const payload: Payload = {
            action: PlayerAction.PICK_TRAIN_CARD,
            payload: {
                id: this.localStoreService.getPlayerId(),
                gameId: this.localStoreService.getGameId(),
                trainCardIndex: trainCardIndex
            }
        }
        this.gameSocketService.sendMessage(payload)
    }

    pickRandomTrainCard() {
        const payload: Payload = {
            action: PlayerAction.PICK_RANDOM_TRAIN_CARD,
            payload: {
                id: this.localStoreService.getPlayerId(),
                gameId: this.localStoreService.getGameId()
            }
        }
        this.gameSocketService.sendMessage(payload)
    }

    getDestinationCards(): void {
        const payload: Payload = {
            action: PlayerAction.GET_DESTINATION_CARDS,
            payload: {
                id: this.localStoreService.getPlayerId(),
                gameId: this.localStoreService.getGameId()
            }
        }
        this.gameSocketService.sendMessage(payload)
    }

    pickDestinationCards(destinationCardIds: number[]) {
        const payload: Payload = {
            action: PlayerAction.PICK_DESTINATION_CARDS,
            payload: {
                id: this.localStoreService.getPlayerId(),
                gameId: this.localStoreService.getGameId(),
                destinationCardIds: destinationCardIds
            }
        }
        this.gameSocketService.sendMessage(payload)
    }

    build(pathId: PathID, trainCards: TrainColor[]) {
        const payload: Payload = {
            action: PlayerAction.BUILD,
            payload: {
                id: this.localStoreService.getPlayerId(),
                gameId: this.localStoreService.getGameId(),
                pathId: pathId,
                trainCards: trainCards
            }
        }
        this.gameSocketService.sendMessage(payload)
    }
}
