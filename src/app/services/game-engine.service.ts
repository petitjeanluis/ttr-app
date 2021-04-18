import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { City } from '../models/city';
import { DestinationCard } from '../models/destination_card';
import { Path } from '../models/path';
import { PathPiece } from "../models/path_piece";
import { CITIES, DESTINATION_CARDS, PATHS } from '../resources/constants';
import { BOARD_EVENT } from '../resources/events';
import {Point} from "../models/point";
import {BoardComponent} from "../components/board/board.component";

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

	ready: Boolean = false
	public cities: City[] = []
	public paths: Path[] = []
	public destinationCards: DestinationCard[] = []
    public boardComponent: BoardComponent

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
    }

	public registerBoardComponent(boardComponent: BoardComponent) {
		return this.boardComponent = boardComponent
	}

	public mouseClick(event: MouseEvent) {
        for (let i = 0; i < this.paths.length; i++) {
            if (this.paths[i].isInPath(new Point(event.offsetX,event.offsetY))) {
                this.paths[i].setColor("green")
                this.boardComponent.drawBoard()
                return
            }
        }
	}
}
