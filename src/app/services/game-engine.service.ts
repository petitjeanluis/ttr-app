import { Injectable } from '@angular/core';
import { City } from '../view-elements/city';
import { DestinationCard } from '../models/destination-card';
import { Path } from '../view-elements/path';
import { PathPiece } from "../view-elements/path-piece";
import {
    CITIES,
    DESTINATION_CARDS,
    NUMBER_OF_TOP_CARDS,
    PATHS, TRAIN_CARD_HEIGHT, TRAIN_CARD_SPACE,
    TRAIN_CARD_X,
    TRAIN_CARD_Y,
    TRAIN_CARDS
} from '../resources/constants';
import {Point} from "../models/point";
import {BoardComponent} from "../components/board/board.component";
import {GameCardsComponent} from "../components/game-cards/game-cards.component";
import {Utils} from "../resources/utils";
import {TrainCard} from "../view-elements/train-card";
import {TrainCardOrderedSet} from "../models/train-card-ordered-set";

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

	public cities: City[] = []
	public paths: Path[] = []
	public destinationCards: DestinationCard[] = []
    public trainCards: TrainCard[] = []
    public faceUpTrainCards: TrainCardOrderedSet

    // game-card-view
        // stockPileTrainCard
        // trainCardSetSelector: list
        // stockPileDestinationCard
    // game-status view
        // playerCard : list
        // gameInfoCard
    // player-info view
        // trainCard: list
        // destinationCard: list
        // playerCard


    public boardComponent: BoardComponent
    public gameCardsComponent: GameCardsComponent

	constructor() {
        CITIES.forEach(
          city => {
            this.cities.push(new City(city['x'],city['y'],city['labelX'],city['labelY'],city['name']))
          }
        )
        PATHS.forEach(
          path => {
            let pathPieces: PathPiece[] = []
            path['paths'].forEach(pathPiece => {
              pathPieces.push(new PathPiece(pathPiece['x'], pathPiece['y'], pathPiece['degrees']))
            });
            this.paths.push(new Path(path['cityOneId'],path['cityTwoId'],pathPieces))
          }
        )
        DESTINATION_CARDS.forEach(
          card => {
            this.destinationCards.push({city1:card['city1'],city2:card['city2'],value:card['value']})
          }
        )
        TRAIN_CARDS.forEach(
            trainCard => {
                for (let i = 0; i < trainCard.count; i++) {
                    this.trainCards.push(
                        new TrainCard(
                            trainCard.type,
                            new Point(0,0)))
                }
            }
        )
        Utils.shuffleArray(this.trainCards)

        let topFiveCards = []
        for (let i = 0; i < NUMBER_OF_TOP_CARDS; i++) {
            topFiveCards.push(this.trainCards.shift())
        }
        this.faceUpTrainCards = new TrainCardOrderedSet(NUMBER_OF_TOP_CARDS,topFiveCards)
    }

	public registerBoardComponent(boardComponent: BoardComponent) {
		this.boardComponent = boardComponent
	}

	public boardClick(event: MouseEvent) {
        for (let i = 0; i < this.paths.length; i++) {
            if (this.paths[i].isTouched(new Point(event.offsetX,event.offsetY))) {
                this.paths[i].setColor("green")
                this.boardComponent.drawComponent()
                return
            }
        }
	}

	public registerGameCardsComponent(gameCardsComponent: GameCardsComponent) {
	    this.gameCardsComponent = gameCardsComponent
    }

    public gameCardClick(event: MouseEvent) {
	    let selectedCard = this.faceUpTrainCards.findCard(new Point(event.offsetX,event.offsetY))
        if (selectedCard) {
            let newCard = this.trainCards.shift()
            this.faceUpTrainCards.removeAndAdd(selectedCard,newCard)
            this.gameCardsComponent.drawComponent()
        }
        /*
        * TODO
        * Give card to player
        * Reshuffle if three wildcards are present
        *
        * */

    }

}
