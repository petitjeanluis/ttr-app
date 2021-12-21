import {Point} from '../models/point'
import {TouchableEntity} from '../interfaces/touchable-entity'
import {
    PILE_CARD_FONT, PILE_CARD_FONT_COLOR,
    TRAIN_CARD_HEIGHT,
    TRAIN_CARD_WIDTH
} from '../resources/game-cards-constants'
import {CARD_COLOR} from '../resources/constants';
import {Utils} from '../resources/utils';

export class DestinationCardPile extends TouchableEntity{

    private readonly point: Point

    constructor(point: Point, ctx: CanvasRenderingContext2D) {
        super(ctx)
        this.point = point
    }

    draw(): void {
        this.ctx.fillStyle = CARD_COLOR
        this.ctx.fillRect(this.point.x, this.point.y, TRAIN_CARD_WIDTH,TRAIN_CARD_HEIGHT)
        this.ctx.strokeStyle = 'black'
        this.ctx.strokeRect(this.point.x, this.point.y, TRAIN_CARD_WIDTH,TRAIN_CARD_HEIGHT)
        this.ctx.fillStyle = PILE_CARD_FONT_COLOR
        this.ctx.font = PILE_CARD_FONT
        this.ctx.fillText('DESTINATION', this.point.x + 6, this.point.y + 26)
        this.ctx.fillText('CARDS', this.point.x + 26, this.point.y + 44)
    }

    isTouched(point: Point): boolean {
        return Utils.rectangleTouched(point, this.point.x, this.point.y, TRAIN_CARD_WIDTH, TRAIN_CARD_HEIGHT)
    }

}
