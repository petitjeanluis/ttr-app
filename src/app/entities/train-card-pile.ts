import {Point} from "../models/point";
import {InteractiveEntity} from "../models/interactive-entity";
import {
    PILE_CARD_COLOR, PILE_CARD_FONT, PILE_CARD_FONT_COLOR, TRAIN_CARD_HEIGHT,
    TRAIN_CARD_PILE_Y,
    TRAIN_CARD_PILE_X,
    TRAIN_CARD_WIDTH
} from "../resources/game-cards-constants";

export class TrainCardPile extends InteractiveEntity{


    constructor() {
        super(new Point(TRAIN_CARD_PILE_X,TRAIN_CARD_PILE_Y))
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        ctx.fillStyle = PILE_CARD_COLOR
        ctx.fillRect(this.location.x,this.location.y,TRAIN_CARD_WIDTH,TRAIN_CARD_HEIGHT)
        ctx.fillStyle = PILE_CARD_FONT_COLOR
        ctx.font = PILE_CARD_FONT
        ctx.fillText("TRAIN",this.location.x+21,this.location.y+22)
        ctx.fillText("CARDS",this.location.x+18,this.location.y+40)
        ctx.restore()
    }

    isTouched(point: Point): boolean {
        let xMin = this.location.x
        let yMin = this.location.y
        let xMax = xMin + TRAIN_CARD_WIDTH
        let yMax = yMin + TRAIN_CARD_HEIGHT

        if (
            point.x >= xMin &&
            point.x < xMax &&
            point.y >= yMin &&
            point.y < yMax
        ) {
            return true
        } else {
            return false
        }
    }

}
