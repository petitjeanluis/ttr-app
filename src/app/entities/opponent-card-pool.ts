import {Drawable} from "../models/drawable";
import {Player} from "../models/player";
import {PlayerCard} from "./player-card";
import {Point} from "../models/point";
import {EntityContainer} from "../models/entity-container";
import {
    OPPONENT_CARD_SPACING,
    OPPONENT_CARD_X,
    OPPONENT_CARD_Y,
    PLAYER_CARD_HEIGHT
} from "../resources/player-info-constants";

export class OpponentCardPool implements EntityContainer {

    private opponentCards: PlayerCard[]

    constructor(opponents: Player[]) {
        this.opponentCards = []
        for (let  i = 0; i < opponents.length; i++) {
            let point = new Point(0, 0)
            point.x = OPPONENT_CARD_X
            point.y = OPPONENT_CARD_Y + (PLAYER_CARD_HEIGHT + OPPONENT_CARD_SPACING) * i
            this.opponentCards.push(new PlayerCard(point, opponents[i]))
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.opponentCards.forEach(opponentCard => {
            opponentCard.draw(ctx)
        })
    }

}
