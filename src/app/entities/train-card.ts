import {InteractiveEntity} from "../models/interactive-entity";
import {Point} from "../models/point";
import {TrainType} from "../models/train-type";
import {TRAIN_CARD_HEIGHT, TRAIN_CARD_WIDTH} from "../resources/game-cards-constants";

export class TrainCard extends InteractiveEntity {

    private static idCounter = 0
    trainType: TrainType
    isWild: boolean
    color: string
    id: number

    constructor(location: Point, trainType: TrainType) {
        super(location)
        this.trainType = trainType
        if (trainType === TrainType.WILD) {
            this.isWild = true
        } else {
            this.color = trainType.toString()
        }
        this.id = TrainCard.idCounter++
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if (this.isWild) {
            this.drawWild(ctx)
        } else {
            this.drawRegular(ctx)
        }
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

    private drawRegular(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.fillStyle = this.color
        ctx.fillRect(this.location.x,this.location.y,TRAIN_CARD_WIDTH,TRAIN_CARD_HEIGHT)
        ctx.restore()
    }

    private drawWild(ctx: CanvasRenderingContext2D) {
        ctx.save()
        const widthPiece = TRAIN_CARD_WIDTH/8
        let x = this.location.x
        for (let trainCardType in TrainType){
            if (TrainType[trainCardType] == "wild") {
                continue
            }
            ctx.fillStyle = TrainType[trainCardType]
            ctx.fillRect(x,this.location.y,widthPiece,TRAIN_CARD_HEIGHT)
            x += widthPiece
        }
        ctx.restore()
    }

}
