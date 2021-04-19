import { Injectable } from '@angular/core';
import { City } from '../models/city';
import { DestinationCard } from '../models/destinationCard';
import { Path } from '../models/path';
import { PathPiece } from "../models/pathPiece";
import {CITIES, DESTINATION_CARDS, NUMBER_OF_TOP_CARDS, PATHS, TRAIN_CARDS} from '../resources/constants';
import {Point} from "../models/point";
import {BoardComponent} from "../components/board/board.component";
import {GameCardsComponent} from "../components/game-cards/game-cards.component";
import {TrainCard} from "../models/trainCard";
import {Utils} from "../resources/utils";
import {TopTrainCard} from "../models/topTrainCard";

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

	ready: Boolean = false
	public cities: City[] = []
	public paths: Path[] = []
	public destinationCards: DestinationCard[] = []
    public trainCards: TrainCard[] = []
    public topTrainCards: TopTrainCard[] = []

    public boardComponent: BoardComponent
    public gameCardsComponent: GameCardsComponent

	constructor() {
        this.initializeBoard()
	}

	private initializeBoard() {
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
                    this.trainCards.push(new TrainCard(trainCard.type))
                }
            }
        )
        Utils.shuffleArray(this.trainCards)
        for (let i = 0; i < NUMBER_OF_TOP_CARDS; i++) {
            this.topTrainCards.push(new TopTrainCard(this.trainCards.shift(),i))
        }
    }

	public registerBoardComponent(boardComponent: BoardComponent) {
		this.boardComponent = boardComponent
	}

	public boardClick(event: MouseEvent) {
        for (let i = 0; i < this.paths.length; i++) {
            if (this.paths[i].isInPath(new Point(event.offsetX,event.offsetY))) {
                this.paths[i].setColor("green")
                this.boardComponent.drawBoard()
                return
            }
        }
	}

	public registerGameCardsComponent(gameCardsComponent: GameCardsComponent) {
	    this.gameCardsComponent = gameCardsComponent
    }

    public getTopCards() {
        return this.topTrainCards
    }

}
