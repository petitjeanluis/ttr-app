import {TrainCard} from "./train-card";
import {Drawable} from "../models/drawable";
import {TRAIN_CARD_HEIGHT, TRAIN_CARD_Y_SPACING, TRAIN_CARD_X, TRAIN_CARD_Y} from "../resources/constants";
import {Point} from "../models/point";

export class OrderedTrainCardPool implements Drawable{

    private trainCardMap: Map<number,TrainCard>

    constructor(poolSize: number, trainCards: TrainCard[]) {
        if (poolSize != trainCards.length) {
            throw new Error("set size and number of provided dyanmic entities does not match")
        }

        this.trainCardMap = new Map<number,TrainCard>()

        for (let i = 0; i < trainCards.length; i++) {
            trainCards[i].topLeftPoint.x = TRAIN_CARD_X
            trainCards[i].topLeftPoint.y = TRAIN_CARD_Y+(TRAIN_CARD_HEIGHT+TRAIN_CARD_Y_SPACING)*i
            this.trainCardMap.set(i,trainCards[i])
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        for (let trainCard of this.trainCardMap.values()) {
            trainCard.draw(ctx)
        }
    }

    trainCardTouched(point: Point) {
        for (let [key,trainCard] of this.trainCardMap) {
            if(trainCard.isTouched(point)) {
                return key
            }
        }
        return -1
    }

    replaceTrainCard(trainCardKey: number, newTrainCard: TrainCard) {
        if (trainCardKey >= this.trainCardMap.size) {
            throw new Error("trainCardKey is out of range!")
        }

        let oldCard: TrainCard =  this.trainCardMap.get(trainCardKey)

        newTrainCard.topLeftPoint.x = TRAIN_CARD_X
        newTrainCard.topLeftPoint.y = TRAIN_CARD_Y+(TRAIN_CARD_HEIGHT+TRAIN_CARD_Y_SPACING)*trainCardKey
        this.trainCardMap.set(trainCardKey, newTrainCard)

        return oldCard
    }



}
