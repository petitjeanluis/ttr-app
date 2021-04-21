import {TrainCard} from "../view-elements/train-card";
import {Drawable} from "./drawable";
import {TRAIN_CARD_HEIGHT, TRAIN_CARD_SPACE, TRAIN_CARD_X, TRAIN_CARD_Y} from "../resources/constants";
import {Point} from "./point";

export class TrainCardOrderedSet implements Drawable{

    public trainCards: TrainCard[]

    constructor(setSize: number, trainCards: TrainCard[]) {
        if (setSize != trainCards.length) {
            throw new Error("set size and number of provided dyanmic entities does not match")
        }
        this.trainCards = trainCards

        for (let i = 0; i < this.trainCards.length; i++) {
            this.trainCards[i].topLeftPoint = new Point(TRAIN_CARD_X,TRAIN_CARD_Y+(TRAIN_CARD_HEIGHT+TRAIN_CARD_SPACE)*i)
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.trainCards.forEach(card => {
            card.draw(ctx)
        })
        console.log(this.trainCards.length)
    }

    findCard(point: Point) {
        for (let i = 0; i < this.trainCards.length; i++) {
            if(this.trainCards[i].isTouched(point)) {
                return this.trainCards[i]
            }
        }
        return null
    }

    removeAndAdd(trainCardToRemove: TrainCard, trainCardToAdd: TrainCard) {
        // verify card exist
        let found = false
        for (let i = 0; i < this.trainCards.length; i++) {
            if (trainCardToRemove.id == this.trainCards[i].id) {
                found = true
                this.copyCoordinates(trainCardToRemove,trainCardToAdd)
                return this.trainCards.splice(i,1,trainCardToAdd)[0]
            }
        }
        if (!found) {
            throw new Error("Tried to remove a card that does not exist from the train card ordered set")
        }
    }

    private copyCoordinates(fromTrainCard: TrainCard, toTrainCard: TrainCard) {
        toTrainCard.topLeftPoint.x = fromTrainCard.topLeftPoint.x
        toTrainCard.topLeftPoint.y = fromTrainCard.topLeftPoint.y
    }



}
