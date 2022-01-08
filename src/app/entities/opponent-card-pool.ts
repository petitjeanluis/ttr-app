import {OpponentPlayerCard} from './opponent-player-card'
import {Point} from '../models/point'
import {
    OPPONENT_CARD_SPACING,
    OPPONENT_CARD_X,
    OPPONENT_CARD_Y,
    OPPONENT_PLAYER_CARD_HEIGHT
} from '../resources/player-info-constants'
import {Opponent} from '../state/opponent';

export class OpponentCardPool {

    private opponentCards: OpponentPlayerCard[] = []
    private readonly ctx: CanvasRenderingContext2D

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }

    private setOpponentDetails(opponents: Opponent[]) {
        this.opponentCards = []
        for (let  i = 0; i < opponents.length; i++) {
            const point = new Point(0, 0)
            point.x = OPPONENT_CARD_X
            point.y = OPPONENT_CARD_Y + (OPPONENT_PLAYER_CARD_HEIGHT + OPPONENT_CARD_SPACING) * i
            this.opponentCards.push(new OpponentPlayerCard(point, opponents[i], this.ctx))
        }
    }

    draw(opponentDetails: Opponent[]): void {
        this.setOpponentDetails(opponentDetails)
        
        this.opponentCards.forEach(opponentCard => {
            opponentCard.draw()
        })
    }

}
