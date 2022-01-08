import {Point} from '../models/point';
import {
    ACTIVE_PLAYER_DETAILS_HEIGHT,
    ACTIVE_PLAYER_DETAILS_WIDTH,
    ACTIVE_PLAYER_DETAILS_X,
    ACTIVE_PLAYER_DETAILS_Y
} from '../resources/player-info-constants';
import {Player} from '../state/player';
import {CARD_COLOR, CARD_SPACING, COLOR_MAP} from '../resources/constants';
import {TrainColor} from '../models/train-color';
import {BOARD_COLOR} from '../resources/board-constants';
import {TouchableEntity} from '../interfaces/touchable-entity';
import {Utils} from '../resources/utils';

export class PlayerCard extends TouchableEntity {

    private point: Point
    private SMALL_TRAIN_CARD_WIDTH = 24
    private SMALL_TRAIN_CARD_HEIGHT = 24
    private DESTINATION_CARDS_X = ACTIVE_PLAYER_DETAILS_X + 10
    private DESTINATION_CARDS_Y = ACTIVE_PLAYER_DETAILS_Y + 95
    private DESTINATION_CARDS_WIDTH = 55
    private DESTINATION_CARDS_HEIGHT = 26

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx)
        this.point = new Point(ACTIVE_PLAYER_DETAILS_X, ACTIVE_PLAYER_DETAILS_Y)
    }

    draw(player: Player): void {
        this.ctx.fillStyle = CARD_COLOR
        this.ctx.fillRect(this.point.x, this.point.y, ACTIVE_PLAYER_DETAILS_WIDTH, ACTIVE_PLAYER_DETAILS_HEIGHT)
        this.ctx.strokeStyle = 'black'
        this.ctx.strokeRect(this.point.x, this.point.y, ACTIVE_PLAYER_DETAILS_WIDTH, ACTIVE_PLAYER_DETAILS_HEIGHT)

        this.drawTrainCards(player)
        this.drawDestinationAndTrainCount(player)
    }


    private drawDestinationAndTrainCount(player: Player): void {
        let x = this.DESTINATION_CARDS_X
        let dx = 93
        let y = this.DESTINATION_CARDS_Y

        this.ctx.fillStyle = 'black'
        this.ctx.fillText(player.destinationCards.length.toString(), x, y)
        this.ctx.fillText(player.trainCount.toString(), x + dx, y)
        y += 2

        this.ctx.fillStyle = BOARD_COLOR
        this.ctx.fillRect(x, y, this.DESTINATION_CARDS_WIDTH, this.DESTINATION_CARDS_HEIGHT)
        this.ctx.fillRect(x + dx, y, this.DESTINATION_CARDS_WIDTH, this.DESTINATION_CARDS_HEIGHT)

        this.ctx.fillStyle = 'black'
        this.ctx.fillText('A --> B', x+12, y+16)

        this.ctx.fillStyle = 'black'
        this.ctx.fillText('Trains', x+12 + dx, y+16)

    }

    private drawTrainCards(player: Player): void {
        let trainCardMap = this.getTrainCardMap(player)

        let index = 0
        const x = ACTIVE_PLAYER_DETAILS_X + 10
        const y = ACTIVE_PLAYER_DETAILS_Y + 12

        for (let [color, count] of trainCardMap.entries()) {
            let dx = ((this.SMALL_TRAIN_CARD_WIDTH + CARD_SPACING) * (index % 5))
            let dy = ((this.SMALL_TRAIN_CARD_WIDTH + CARD_SPACING * 2.5) * Math.floor(index / 5))

            this.ctx.fillStyle = 'black'
            this.ctx.fillText(count.toString(), x + dx, y + dy)
            dy += 2

            if (color === TrainColor.WILD) {
                this.drawWild(x + dx, y + dy, this.SMALL_TRAIN_CARD_WIDTH, this.SMALL_TRAIN_CARD_HEIGHT)
            } else {
                this.drawRegular(color, x + dx, y + dy, this.SMALL_TRAIN_CARD_WIDTH, this.SMALL_TRAIN_CARD_HEIGHT)
            }
            index++
        }
    }

    private getTrainCardMap(player: Player): Map<TrainColor,number> {
        const trainCardMap = new Map<TrainColor, number>()
        player.trainCards.forEach(trainCard => {
            const count = trainCardMap.get(trainCard)
            if (count) {
                trainCardMap.set(trainCard, count + 1)
            }
            else {
                trainCardMap.set(trainCard, 1)
            }
        })
        return trainCardMap
    }

    private drawRegular(color: TrainColor , x: number, y: number, w: number, h: number): void {
        this.ctx.fillStyle = COLOR_MAP[color]
        this.ctx.fillRect(x, y, w, h)
    }

    private drawWild(x: number, y: number, w: number, h: number): void {
        const widthPiece = w / 8
        for (const trainColor in TrainColor){
            if (trainColor.valueOf() === 'WILD') {
                continue
            }
            this.ctx.fillStyle = TrainColor[trainColor]
            this.ctx.fillRect(x, y, widthPiece, h)
            x += widthPiece
        }
    }

    isTouched(point: Point): boolean {
        return Utils.rectangleTouched(point, this.DESTINATION_CARDS_X, this.DESTINATION_CARDS_Y, this.DESTINATION_CARDS_WIDTH, this.DESTINATION_CARDS_HEIGHT)
    }
}
