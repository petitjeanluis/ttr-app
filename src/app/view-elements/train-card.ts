import {DynamicEntity} from "../models/dynamic-entity";
import {Point} from "../models/point";
import {TrainCardType} from "../models/train-card-type";
import {TRAIN_CARD_HEIGHT, TRAIN_CARD_WIDTH} from "../resources/constants";

export class TrainCard implements DynamicEntity{

    private static idCounter = 0
    trainCardType: TrainCardType
    topLeftPoint: Point
    isWild: boolean
    color: string
    id: number

    constructor(trainCardType: TrainCardType, topLeftPoint: Point) {
        this.trainCardType = trainCardType
        this.topLeftPoint = topLeftPoint
        if (trainCardType === TrainCardType.WILD) {
            this.isWild = true
        } else {
            this.color = trainCardType.toString()
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

    drawRegular(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.fillStyle = this.color
        ctx.fillRect(this.topLeftPoint.x,this.topLeftPoint.y,TRAIN_CARD_WIDTH,TRAIN_CARD_HEIGHT)
        ctx.restore()
    }

    drawWild(ctx: CanvasRenderingContext2D) {
        ctx.save()
        const widthPiece = TRAIN_CARD_WIDTH/8
        let trainCardType: TrainCardType
        let x = this.topLeftPoint.x
        for (let trainCardType in TrainCardType){
            if (trainCardType == "WILD") {
                continue
            }
            ctx.fillStyle = trainCardType
            ctx.fillRect(x,this.topLeftPoint.y,widthPiece,TRAIN_CARD_HEIGHT)
            x += widthPiece
        }
        ctx.restore()
    }

}
