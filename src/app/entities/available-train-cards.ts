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

    private readonly trainCards: TrainCard[]
    private ctx: CanvasRenderingContext2D

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.trainCards = []

        for (let i = 0; i < NUMBER_OF_TOP_CARDS; i++) {
            const x = TRAIN_CARD_X
            const y = TRAIN_CARD_Y + (TRAIN_CARD_HEIGHT + CARD_SPACING) * i
            const trainCard = new TrainCard(new Point(x, y), TrainColor.BLACK, this.ctx)
            this.trainCards[i] = trainCard
        }
    }

    private updateAvailableTrainCards(trainCardColors: TrainColor[]) {
        if (trainCardColors.length != NUMBER_OF_TOP_CARDS) {
            throw new Error("number of available cards provided is not " + NUMBER_OF_TOP_CARDS);
        }

        for (let i = 0; i < NUMBER_OF_TOP_CARDS; i++) {
            this.trainCards[i].trainColor = trainCardColors[i]
        }
    }

    draw(availableCards: TrainColor[]): void {
        this.updateAvailableTrainCards(availableCards)

        for (const trainCard of this.trainCards.values()) {
            trainCard.draw()
        }
    }

    entityTouched(point: Point): number {
        for (let i = 0; i < this.trainCards.length; i++) {
            if (this.trainCards[i].isTouched(point)) {            
                return i
            }
        }
        return null
    }
}
