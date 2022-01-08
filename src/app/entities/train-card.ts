import {TouchableEntity} from '../interfaces/touchable-entity'
import {Point} from '../models/point'
import {TrainColor} from '../models/train-color'
import { COLOR_MAP } from '../resources/constants';
import {TRAIN_CARD_HEIGHT, TRAIN_CARD_WIDTH} from '../resources/game-cards-constants'
import {Utils} from '../resources/utils';

export class TrainCard extends TouchableEntity {

    private static idCounter = 0
    trainColor: TrainColor
    private readonly isWild: boolean
    private id: number
    public readonly point: Point

    constructor(point: Point, trainType: TrainColor, ctx: CanvasRenderingContext2D) {
        super(ctx)
        this.point = point
        this.trainColor = trainType
        if (trainType === TrainColor.WILD) {
            this.isWild = true
        } else {
            this.trainColor = trainType
        }
        this.id = TrainCard.idCounter++
    }

    draw(): void {
        if (this.isWild) {
            this.drawWild()
        } else {
            this.drawRegular()
        }
        this.ctx.strokeStyle = 'black'
        this.ctx.strokeRect(this.point.x, this.point.y, TRAIN_CARD_WIDTH, TRAIN_CARD_HEIGHT)
    }

    isTouched(point: Point): boolean {
        return Utils.rectangleTouched(point, this.point.x, this.point.y, TRAIN_CARD_WIDTH, TRAIN_CARD_HEIGHT)
    }

    private drawRegular(): void {
        this.ctx.fillStyle = COLOR_MAP[this.trainColor]
        this.ctx.fillRect(this.point.x, this.point.y, TRAIN_CARD_WIDTH, TRAIN_CARD_HEIGHT)
    }

    private drawWild(): void {
        const widthPiece = TRAIN_CARD_WIDTH / 8
        let x = this.point.x
        for (const trainCardType in TrainColor){
            if (trainCardType === 'WILD') {
                continue
            }
            this.ctx.fillStyle = TrainColor[trainCardType]
            this.ctx.fillRect(x, this.point.y, widthPiece, TRAIN_CARD_HEIGHT)
            x += widthPiece
        }
    }

}
