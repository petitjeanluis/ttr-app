import {TrainCard} from "./trainCard";
import {Drawable} from "../resources/drawable";
import {
    TOP_CARD_SPACE_S,
    TOP_CARD_X_S,
    TOP_CARD_Y_S,
    TRAIN_CARD_HEIGHT_S,
    TRAIN_CARD_WIDTH_S
} from "../resources/constants";
import {TrainCardType} from "../resources/trainCardType";

export class TopTrainCard implements Drawable{
    trainCard: TrainCard
    index: number
    isWild: boolean

    constructor(trainCard: TrainCard, index: number) {
        this.trainCard = trainCard
        this.index = index
        this.isWild = this.trainCard.trainCardType === TrainCardType.WILD
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if (this.isWild) {
            this.drawWild(ctx)
        } else {
            this.drawRegular(ctx)
        }
    }

    drawRegular(ctx: CanvasRenderingContext2D) {
        let y = TOP_CARD_Y_S + (TRAIN_CARD_HEIGHT_S+TOP_CARD_SPACE_S)*this.index
        ctx.save()
        ctx.fillStyle = this.trainCard.trainCardType
        ctx.fillRect(TOP_CARD_X_S,y,TRAIN_CARD_WIDTH_S,TRAIN_CARD_HEIGHT_S)
        ctx.restore()
    }

    drawWild(ctx: CanvasRenderingContext2D) {
        let y = TOP_CARD_Y_S + (TRAIN_CARD_HEIGHT_S+TOP_CARD_SPACE_S)*this.index
        ctx.save()
        let x = TOP_CARD_X_S
        const widthPiece = TRAIN_CARD_WIDTH_S/8
        let trainCardType: TrainCardType
        for (let trainCardType in TrainCardType){
            if (trainCardType == "WILD") {
                continue
            }
            ctx.fillStyle = trainCardType
            ctx.fillRect(x,y,widthPiece,TRAIN_CARD_HEIGHT_S)
            x += widthPiece
        }
        ctx.restore()
    }
}
