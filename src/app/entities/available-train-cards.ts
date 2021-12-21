import {TrainCard} from './train-card'
import {Point} from '../models/point'
import {
    NUMBER_OF_TOP_CARDS,
    TRAIN_CARD_HEIGHT,
    TRAIN_CARD_X,
    TRAIN_CARD_Y
} from '../resources/game-cards-constants';
import {CARD_SPACING} from '../resources/constants';
import {TrainColor} from '../models/train-color';

export class AvailableTrainCards {

    private readonly trainCardMap: Map<number, TrainCard>
    private ctx: CanvasRenderingContext2D

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.trainCardMap = new Map<number, TrainCard>()
    }

    updateAvailableTrainCards(trainCardColors: TrainColor[]) {
        if (trainCardColors.length != NUMBER_OF_TOP_CARDS) {
            throw new Error("number of available cards provided is not " + NUMBER_OF_TOP_CARDS);
        }

        this.trainCardMap.clear()
        for (let i = 0; i < trainCardColors.length; i++) {
            const x = TRAIN_CARD_X
            const y = TRAIN_CARD_Y + (TRAIN_CARD_HEIGHT + CARD_SPACING) * i
            const trainCard = new TrainCard(new Point(x, y), trainCardColors[i], this.ctx)
            this.trainCardMap.set(i, trainCard)
        }
    }

    draw(): void {
        for (const trainCard of this.trainCardMap.values()) {
            trainCard.draw()
        }
    }

    entityTouched(point: Point): [number, TrainColor] {
        for (const [key, trainCard] of this.trainCardMap) {
            if (trainCard.isTouched(point)) {
                return [key, trainCard.trainColor]
            }
        }
        return [-1, null]
    }

    replaceTrainCard(trainCardSlot: number, trainColor: TrainColor) {
        if (trainCardSlot >= this.trainCardMap.size) {
            throw new Error('trainCardSlot is out of range!')
        }

        const x = TRAIN_CARD_X
        const y = TRAIN_CARD_Y + (TRAIN_CARD_HEIGHT + CARD_SPACING) * trainCardSlot

        this.trainCardMap.set(trainCardSlot, new TrainCard(new Point(x, y), trainColor, this.ctx))
    }



}
