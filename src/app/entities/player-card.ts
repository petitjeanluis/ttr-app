import {Entity} from "../models/entity";
import {Player} from "../models/player";
import {Point} from "../models/point";
import {
    FONT_MARGIN,
    OPPONENT_CARD_COLOR,
    PLAYER_CARD_HEIGHT,
    PLAYER_CARD_WIDTH
} from "../resources/player-info-constants";

export class PlayerCard extends Entity {

    private player: Player

    constructor(location:Point, player: Player) {
        super(location)
        this.player = player
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save()

        ctx.fillStyle = OPPONENT_CARD_COLOR
        ctx.fillRect(this.location.x,this.location.y,PLAYER_CARD_WIDTH,PLAYER_CARD_HEIGHT)

        let text = ""
        let yCursor = this.location.y
        let xCursor = this.location.x + FONT_MARGIN
        ctx.fillStyle = this.player.color

        text = `${this.player.name}`
        yCursor += this.getTextHeight(ctx,text) + FONT_MARGIN
        ctx.fillText(text,xCursor, yCursor)

        text = `Train Cards: ${this.player.trainsCards.length}`
        yCursor += this.getTextHeight(ctx,text) + FONT_MARGIN
        ctx.fillText(text,xCursor, yCursor)

        text = `Destinations: ${this.player.destinationCards.length}`
        yCursor += this.getTextHeight(ctx,text) + FONT_MARGIN
        ctx.fillText(text,xCursor, yCursor)

        text = `Trains Pieces: ${this.player.availableTrains}`
        yCursor += this.getTextHeight(ctx,text) + FONT_MARGIN
        ctx.fillText(text,xCursor, yCursor)

        text = `Score: ${this.player.score}`
        yCursor += this.getTextHeight(ctx,text) + FONT_MARGIN
        ctx.fillText(text,xCursor, yCursor)


        ctx.restore()
    }

    private getTextHeight(ctx: CanvasRenderingContext2D, text: string) {
        let measurement: TextMetrics = ctx.measureText(text)
        return measurement.fontBoundingBoxAscent + measurement.actualBoundingBoxDescent
    }

}
