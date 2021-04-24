import { Injectable } from '@angular/core';
import {Point} from "../models/point";
import {BoardComponent} from "../components/board/board.component";
import {GameCardsComponent} from "../components/game-cards/game-cards.component";

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

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

    }

    public canTakePath(pathId: number): boolean {
	    return true
    }

	public registerBoardComponent(boardComponent: BoardComponent) {
		this.boardComponent = boardComponent
	}

	public registerGameCardsComponent(gameCardsComponent: GameCardsComponent) {
	    this.gameCardsComponent = gameCardsComponent
    }

    public gameCardClick(event: MouseEvent) {

    }

}
