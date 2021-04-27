import {TrainCard} from "./train-card";
import {Point} from "../models/point";
import {InteractiveEntityContainer} from "../models/interactive-entity-container";
import {
    TRAIN_CARD_HEIGHT,
    TRAIN_CARD_SPACING,
    TRAIN_CARD_X,
    TRAIN_CARD_Y
} from "../resources/game-cards-constants";

export class TrainCardPool implements InteractiveEntityContainer {

    private trainCardMap: Map<number,TrainCard>

    constructor(poolSize: number, trainCards: TrainCard[]) {
        if (poolSize != trainCards.length) {
            throw new Error("set size and number of provided dyanmic entities does not match")
        }

        this.trainCardMap = new Map<number,TrainCard>()

        for (let i = 0; i < trainCards.length; i++) {
            trainCards[i].getLocation().x = TRAIN_CARD_X
            trainCards[i].getLocation().y = TRAIN_CARD_Y+(TRAIN_CARD_HEIGHT+TRAIN_CARD_SPACING)*i
            this.trainCardMap.set(i,trainCards[i])
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        for (let trainCard of this.trainCardMap.values()) {
            trainCard.draw(ctx)
        }
    }

    entityTouched(point: Point) {
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

        newTrainCard.getLocation().x = TRAIN_CARD_X
        newTrainCard.getLocation().y = TRAIN_CARD_Y+(TRAIN_CARD_HEIGHT+TRAIN_CARD_SPACING)*trainCardKey
        this.trainCardMap.set(trainCardKey, newTrainCard)

        return oldCard
    }



}
