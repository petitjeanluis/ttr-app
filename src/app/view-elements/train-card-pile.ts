import {Point} from "../models/point";
import {
    PILE_CARD_COLOR, PILE_CARD_FONT, PILE_CARD_FONT_COLOR,
    TRAIN_CARD_HEIGHT,
    TRAIN_CARD_PIE_Y,
    TRAIN_CARD_PILE_X,
    TRAIN_CARD_WIDTH
} from "../resources/constants";
import {DynamicEntity} from "../models/dynamic-entity";

export class TrainCardPile implements DynamicEntity{

    private topLeftPoint: Point = new Point(TRAIN_CARD_PILE_X,TRAIN_CARD_PIE_Y)

    constructor() {

    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()
        ctx.fillStyle = PILE_CARD_COLOR
        ctx.fillRect(this.topLeftPoint.x,this.topLeftPoint.y,TRAIN_CARD_WIDTH,TRAIN_CARD_HEIGHT)
        ctx.fillStyle = PILE_CARD_FONT_COLOR
        ctx.font = PILE_CARD_FONT
        ctx.fillText("TRAIN",this.topLeftPoint.x+21,this.topLeftPoint.y+22)
        ctx.fillText("CARDS",this.topLeftPoint.x+18,this.topLeftPoint.y+40)
        ctx.restore()
    }

    isTouched(point: Point): boolean {
        let xMin = this.topLeftPoint.x
        let yMin = this.topLeftPoint.y
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
