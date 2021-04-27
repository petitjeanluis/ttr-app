import {Point} from "../models/point";
import {InteractiveEntity} from "../models/interactive-entity";
import {
    PILE_CARD_COLOR, PILE_CARD_FONT, PILE_CARD_FONT_COLOR,
    TRAIN_CARD_HEIGHT,
    TRAIN_CARD_SPACING, TRAIN_CARD_WIDTH,
    TRAIN_CARD_X,
    TRAIN_CARD_Y
} from "../resources/game-cards-constants";

export class DestinationCardPile extends InteractiveEntity{

    constructor() {
        let point = new Point(0,0)
        point.x = TRAIN_CARD_X
        point.y = TRAIN_CARD_Y+(TRAIN_CARD_HEIGHT+TRAIN_CARD_SPACING)*5 + TRAIN_CARD_SPACING*2
        super(point)
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        ctx.fillStyle = PILE_CARD_COLOR
        ctx.fillRect(this.getLocation().x,this.getLocation().y,TRAIN_CARD_WIDTH,TRAIN_CARD_HEIGHT)
        ctx.fillStyle = PILE_CARD_FONT_COLOR
        ctx.font = PILE_CARD_FONT
        ctx.fillText("DESTINATION",this.getLocation().x+3,this.getLocation().y+22)
        ctx.fillText("CARDS",this.getLocation().x+18,this.getLocation().y+40)
        ctx.restore()
    }

    isTouched(point: Point): boolean {
        let xMin = this.getLocation().x
        let yMin = this.getLocation().y
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
