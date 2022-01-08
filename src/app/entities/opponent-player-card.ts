import {Entity} from '../interfaces/entity'
import {Point} from '../models/point'
import {
    FONT_MARGIN, OPPONENT_CARD_BORDER_WIDTH,
    OPPONENT_PLAYER_CARD_HEIGHT,
    OPPONENT_PLAYER_CARD_WIDTH
} from '../resources/player-info-constants';
import {Opponent} from '../state/opponent';
import {CARD_COLOR, COLOR_MAP} from '../resources/constants';

export class OpponentPlayerCard extends Entity {

    private player: Opponent
    private point: Point

    constructor(point: Point, player: Opponent, ctx: CanvasRenderingContext2D) {
        super(ctx)
        this.player = player
        this.point = point
    }

    draw(): void {
        this.ctx.save()

        this.ctx.fillStyle = CARD_COLOR
        this.ctx.fillRect(this.point.x, this.point.y, OPPONENT_PLAYER_CARD_WIDTH, OPPONENT_PLAYER_CARD_HEIGHT)
        this.ctx.strokeStyle = COLOR_MAP[this.player.color]
        this.ctx.lineWidth = OPPONENT_CARD_BORDER_WIDTH
        this.ctx.strokeRect(this.point.x, this.point.y, OPPONENT_PLAYER_CARD_WIDTH, OPPONENT_PLAYER_CARD_HEIGHT)

        let text
        let yCursor = this.point.y
        const xCursor = this.point.x + FONT_MARGIN
        this.ctx.fillStyle = 'black'

        text = `${this.player.name}`
        yCursor += this.getTextHeight(this.ctx, text) + FONT_MARGIN
        this.ctx.fillText(text, xCursor, yCursor)

        text = `Train Cards: ${this.player.trainCardCount}`
        yCursor += this.getTextHeight(this.ctx, text) + FONT_MARGIN
        this.ctx.fillText(text, xCursor, yCursor)

        text = `Destinations: ${this.player.destinationCardCount}`
        yCursor += this.getTextHeight(this.ctx, text) + FONT_MARGIN
        this.ctx.fillText(text, xCursor, yCursor)

        text = `Trains Pieces: ${this.player.trainCount}`
        yCursor += this.getTextHeight(this.ctx, text) + FONT_MARGIN
        this.ctx.fillText(text, xCursor, yCursor)

        text = `Path Score: ${this.player.pathScore}`
        yCursor += this.getTextHeight(this.ctx, text) + FONT_MARGIN
        this.ctx.fillText(text, xCursor, yCursor)


        this.ctx.restore()
    }

    private getTextHeight(ctx: CanvasRenderingContext2D, text: string): number {
        const measurement: TextMetrics = ctx.measureText(text)
        return measurement.fontBoundingBoxAscent + measurement.actualBoundingBoxDescent
    }

}
