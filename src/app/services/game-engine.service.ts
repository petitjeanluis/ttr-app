import { Injectable } from '@angular/core'
import {BoardComponent} from '../components/board/board.component'
import {CardBankComponent} from '../components/card-bank/card-bank.component'
import {DESTINATION_CARDS, NUMBER_OF_TOP_CARDS, TRAIN_CARDS} from '../resources/game-cards-constants';
import {Destination} from '../models/destination';
import {Utils} from '../resources/utils';
import {TrainColor} from '../models/train-color';
import {PlayerBankComponent} from '../components/player-bank/player-bank.component';
import {PathID} from '../models/types';
import {PlayerSummaryState} from '../state/player-summary-state';
import {PlayerColor} from '../models/player-color';
import {PlayerState} from '../state/player-state';
import {ID_CITY_MAP} from '../resources/board-constants';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

    public boardComponent: BoardComponent
    public cardBankComponent: CardBankComponent
    public playerBankComponent: PlayerBankComponent

    private boardResolve: any
    private playerBankResolve: any
    private cardBankResolve: any

    // Game State
    private playerId: number = 0
    private destinationCards: Destination[] = []
    private trainCardColors: TrainColor[] = []
    private playerState: PlayerState = this.getDummyPlayerState()

    constructor() {
        DESTINATION_CARDS.forEach(
            card => {

                this.destinationCards.push(
                    {
                        city1: card.city1,
                        city1Name: ID_CITY_MAP[card.city1],
                        city2: card.city2,
                        city2Name: ID_CITY_MAP[card.city2],
                        value: card.value
                    })
            }
        )
        Utils.shuffleArray(this.destinationCards)

        TRAIN_CARDS.forEach(
            trainCard => {
                for (let i = 0; i < trainCard.count; i++) {
                    this.trainCardColors.push(trainCard.trainColor)
                }
            }
        )
        Utils.shuffleArray(this.trainCardColors)

        const boardRegisteredPromise = new Promise(resolve => this.boardResolve = resolve)
        const playerBankRegisteredPromise = new Promise(resolve => this.playerBankResolve = resolve)
        const cardBankRegisteredPromise = new Promise(resolve => this.cardBankResolve = resolve)
        Promise.all([boardRegisteredPromise,playerBankRegisteredPromise, cardBankRegisteredPromise]).then(() => this.onComponentsReady())
    }

    // Set Up

	public registerBoardComponent(boardComponent: BoardComponent): void {
		this.boardComponent = boardComponent
        this.boardResolve()
	}

	public registerCardBankComponent(gameCardsComponent: CardBankComponent): void {
        this.cardBankComponent = gameCardsComponent
        this.cardBankResolve()
    }

    public registerPlayerBankComponent(playerBankComponent: PlayerBankComponent): void {
        this.playerBankComponent = playerBankComponent
        this.playerBankResolve()
    }

    public onComponentsReady() {

        const trainCardColors = []
        for (let i = 0; i < NUMBER_OF_TOP_CARDS; i++) {
            trainCardColors.push(this.getNextTrainCardColor())
        }
        this.cardBankComponent.updateAvailableTrainCards(trainCardColors)
        this.cardBankComponent.drawComponent()

        // set path ownership
        this.boardComponent.drawComponent()

        this.playerBankComponent.setPlayerState(this.playerState)
        this.playerBankComponent.setPlayerSummaryStates(this.getDummyPlayerSummaryStates())
        this.playerBankComponent.drawComponent()
    }

    // Actions
    randomTrainCardPicked(): void {
        const newCardColor: TrainColor = this.getNextTrainCardColor()
        this.playerState.trainCards.push(newCardColor)
        this.playerBankComponent.drawComponent()
    }

    trainCardPicked(trainCardSlot: number, pickedTrainCardColor: TrainColor): void {
        this.playerState.trainCards.push(pickedTrainCardColor)
        this.playerBankComponent.drawComponent()

        this.cardBankComponent.replaceTrainCard(trainCardSlot, this.getNextTrainCardColor());
        this.cardBankComponent.drawComponent()
    }

    destinationCardsPicked(destinationCards: Destination[], destinationCardSelection: boolean[]) {
        for (let i = 0; i < 3; i++) {
            if (destinationCardSelection[i]) {
                this.playerState.destinationCards.push(destinationCards[i])
            }
            else {
                this.destinationCards.push(destinationCards[i])
            }
        }
        this.playerBankComponent.drawComponent()
    }

    // Getters

    getNextTrainCardColor(): TrainColor {
        return this.trainCardColors.shift()
    }

    getDestinationCards(): Destination[] {
        const destinations: Destination[] = []
        for (let i = 0; i < 3; i++) {
            destinations.push(this.destinationCards.shift())
        }
        return destinations
    }

    public canTakePath(pathId: PathID) {
        return true
    }


    getDummyPlayerState(): PlayerState {
        return {
            id: 0,
            name: 'Gina',
            color: PlayerColor.YELLOW,
            trainCards: [],
            destinationCards: [],
            trainCount: 5,
            pathScore: 5
        }
    }

    getDummyPlayerSummaryStates(): PlayerSummaryState[] {
        const player1: PlayerSummaryState = {
            id: 1,
            name: 'Luis',
            color: PlayerColor.GREEN,
            trainCardCount: 5,
            destinationCardCount: 5,
            trainCount: 10,
            pathScore : 50
        }
        const player2: PlayerSummaryState = {
            id: 1,
            name: 'Gabby',
            color: PlayerColor.BLUE,
            trainCardCount: 5,
            destinationCardCount: 5,
            trainCount: 10,
            pathScore: 40
        }
        const player3: PlayerSummaryState = {
            id: 1,
            name: 'Boots',
            color: PlayerColor.RED,
            trainCardCount: 5,
            destinationCardCount: 5,
            trainCount: 10,
            pathScore: 60
        }

        const player4: PlayerSummaryState = {
            id: 1,
            name: 'Squirrel',
            color: PlayerColor.BLACK,
            trainCardCount: 5,
            destinationCardCount: 5,
            trainCount: 10,
            pathScore: 60
        }

        return [player1, player2, player3, player4]
    }
}
