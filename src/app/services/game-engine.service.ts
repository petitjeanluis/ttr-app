import { Injectable } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';
import { BoardComponent } from '../components/board/board.component';
import { City } from '../models/city';
import { DestinationCard } from '../models/destination_card';
import { Path, PathPiece } from '../models/path';
import { CITIES, DESTINATION_CARDS, PATHS } from '../resources/constants';
import { BOARD_EVENT } from '../resources/events';

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

	ready: Boolean = false
	public cities: City[] = []
	public paths: Path[] = []
	public destinationCards: DestinationCard[] = []

	private boardEvent: Observable<any>
	private boardEventSubcriber: Subscriber<any>

	constructor() {
		// initialize board

		// initialize cities
		CITIES.forEach(
			city => {
				this.cities.push(new City(city['x'],city['y'],city['labelX'],city['labelY'],city['name']))
			}
		)
		// initialize paths
		PATHS.forEach(
			path => {
				let pathPieces: PathPiece[] = []
				path['paths'].forEach(pathPiece => {
					pathPieces.push(new PathPiece(pathPiece['x'], pathPiece['y'], pathPiece['degrees']))
				});
				this.paths.push(new Path(path['cityOneId'],path['cityTwoId'],pathPieces))
			}
		)
		// initialize destination cards
		DESTINATION_CARDS.forEach(
			card => {
				this.destinationCards.push({city1:card['city1'],city2:card['city2'],value:card['value']})
			}
		)

		this.boardEvent = new Observable<any>((subscribe) => {
			this.boardEventSubcriber = subscribe
		})

		// get and update player states
		// get and update board state
	}

	registerBoard() {
		return this.boardEvent
	}

	findIntersection(x: number, y:number) {
		for (let i = 0; i < this.paths.length; i++) {
			if (this.paths[i].isInPath(x,y)) {
				this.boardEventSubcriber.next(BOARD_EVENT.DRAW_PIECE)
			}
		}
	}
}
